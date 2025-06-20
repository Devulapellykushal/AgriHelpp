# agents/community_agent.py
import asyncio
from .llm_client import get_llm_response_sync

async def get_community_insights(crop: str, disease: str) -> dict:
    """
    Generates simulated community insights by running the sync LLM call in a separate thread.
    """
    json_schema = {
        "title": "Community Discussion on {disease}",
        "insights": [
            "A practical, realistic tip that sounds like it came from another farmer.",
            "A second, distinct, and helpful tip from the community."
        ]
    }

    prompt = f"""
    You are simulating content for a farmer's community forum. Generate helpful advice that sounds like it comes from experienced farmers.

    **Crop:** {crop}
    **Disease:** {disease}

    Generate 2 realistic and distinct tips for this issue.

    Your response must be a JSON object adhering to this schema:
    
    **JSON Schema:**
    ```json
    {json_schema}
    ```
    """
    response = await asyncio.to_thread(get_llm_response_sync, prompt, "CommunityAgent")
    
    return response if "error" not in response else {
        "title": "AI Community Agent Error",
        "insights": [response.get("error", "An unknown error occurred.")]
    } 