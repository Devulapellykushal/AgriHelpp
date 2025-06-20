# agents/llm_client.py

import os
import json
import asyncio
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from a .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

# --- Initialize the SYNCHRONOUS Google Generative AI Client ---
try:
    # Get the API key from the environment
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
    
    # Configure the client
    genai.configure(api_key=api_key)
    
    # Set up the model with generation config for JSON output
    generation_config = {
      "temperature": 0.7,
      "response_mime_type": "application/json", # Use Gemini's built-in JSON mode
    }
    # Use the synchronous GenerativeModel
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash", # A fast and powerful model
        generation_config=generation_config
    )
    print("✅ Google Gemini client (synchronous) initialized successfully.")
except Exception as e:
    model = None
    print(f"❌ Failed to initialize Google Gemini client: {e}")

def get_llm_response_sync(prompt: str, agent_name: str) -> dict:
    """
    Gets a structured JSON response from the Gemini model using a SYNCHRONOUS call.
    This function is designed to be run in a separate thread by asyncio.to_thread.
    """
    if not model:
        return {"error": "LLM client is not initialized."}

    try:
        response = model.generate_content(prompt)
        return json.loads(response.text)
    except Exception as e:
        print(f"❌ ({agent_name}) An error occurred while calling Gemini: {e}")
        return {"error": f"Failed to get response from Gemini: {e}"}

async def get_llm_response(prompt: str, agent_name: str) -> dict:
    """
    Gets a structured JSON response from the Gemini model.
    """
    if not model:
        return {"error": "LLM client is not initialized."}

    for attempt in range(3): # Retry logic in case of temporary issues
        response = None # Initialize response to None before the try block
        try:
            # Send the request to the Gemini API
            response = await model.generate_content_async(prompt)
            
            # The response.text will be a valid JSON string due to response_mime_type
            return json.loads(response.text)

        except json.JSONDecodeError as e:
            print(f"⚠️ ({agent_name}) Gemini response was not valid JSON. Retrying... (Attempt {attempt + 1})")
            # Use getattr to safely access response.text, which might not exist
            print(f"   Content received: {getattr(response, 'text', 'N/A')}")
            await asyncio.sleep(1)
            
        except Exception as e:
            # Check for specific safety-related blocks from Gemini only if a response was received
            if response and hasattr(response, 'prompt_feedback'):
                try:
                    if response.prompt_feedback.block_reason:
                        block_reason = response.prompt_feedback.block_reason.name
                        print(f"❌ ({agent_name}) Prompt was blocked by Gemini's safety filters. Reason: {block_reason}")
                        return {"error": f"Request blocked by safety filter: {block_reason}"}
                except (AttributeError, IndexError):
                     pass # No block reason found, handle the general error
                 
            print(f"❌ ({agent_name}) An error occurred while calling Gemini: {e}")
            # This will now correctly report the initial error (e.g., API key issue)
            return {"error": f"Failed to get response from Gemini: {e}"}
            
    # If all retries fail
    return {"error": "Failed to get valid JSON response from Gemini after multiple attempts."}
