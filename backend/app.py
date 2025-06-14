from flask import Flask, request, jsonify
from flask_cors import CORS
from trends import CropTrends
import os
from models import db, ResourceProvider, Product, Review, User, Message
import json
from sqlalchemy import func

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///agrihelp.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# CORS configuration
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000","http://localhost:3003","http://localhost:3002",
            "https://devulapellykushalhig.vercel.app"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
    }
})

# Load the data once on startup
trends_analyzer = CropTrends('TG_AP_CropData.csv')

# Create database tables
with app.app_context():
    db.create_all()

# Resource Provider Routes
@app.route('/api/resource-providers', methods=['GET'])
def get_resource_providers():
    try:
        category = request.args.get('category')
        state = request.args.get('state')
        district = request.args.get('district')

        query = ResourceProvider.query

        if category:
            query = query.filter(ResourceProvider.category == category)
        if state:
            query = query.filter(ResourceProvider.state == state)
        if district:
            query = query.filter(ResourceProvider.district == district)

        providers = query.all()
        return jsonify({
            'providers': [provider.to_dict() for provider in providers]
        }), 200

    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/resource-providers/<int:provider_id>', methods=['GET'])
def get_resource_provider(provider_id):
    try:
        provider = ResourceProvider.query.get_or_404(provider_id)
        return jsonify(provider.to_dict()), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/resource-providers', methods=['POST'])
def create_resource_provider():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'category']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400

        # Create new provider
        provider = ResourceProvider(
            name=data['name'],
            category=data['category'],
            subcategory=data.get('subcategory'),
            description=data.get('description'),
            website=data.get('website'),
            logo_url=data.get('logo_url'),
            contact_email=data.get('contact_email'),
            contact_phone=data.get('contact_phone'),
            address=data.get('address'),
            state=data.get('state'),
            district=data.get('district'),
            services=json.dumps(data.get('services', [])) if data.get('services') else None,
            certifications=json.dumps(data.get('certifications', [])) if data.get('certifications') else None
        )

        db.session.add(provider)
        db.session.commit()

        return jsonify(provider.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/resource-providers/<int:provider_id>', methods=['PUT'])
def update_resource_provider(provider_id):
    try:
        provider = ResourceProvider.query.get_or_404(provider_id)
        data = request.get_json()

        # Update fields
        for field in ['name', 'category', 'subcategory', 'description', 'website', 
                     'logo_url', 'contact_email', 'contact_phone', 'address', 
                     'state', 'district']:
            if field in data:
                setattr(provider, field, data[field])

        if 'services' in data:
            provider.services = json.dumps(data['services'])
        if 'certifications' in data:
            provider.certifications = json.dumps(data['certifications'])

        db.session.commit()
        return jsonify(provider.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/resource-providers/<int:provider_id>', methods=['DELETE'])
def delete_resource_provider(provider_id):
    try:
        provider = ResourceProvider.query.get_or_404(provider_id)
        db.session.delete(provider)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# Product Routes
@app.route('/api/resource-providers/<int:provider_id>/products', methods=['GET'])
def get_provider_products(provider_id):
    try:
        products = Product.query.filter_by(provider_id=provider_id).all()
        return jsonify({
            'products': [product.to_dict() for product in products]
        }), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/resource-providers/<int:provider_id>/products', methods=['POST'])
def create_product(provider_id):
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'category']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400

        product = Product(
            provider_id=provider_id,
            name=data['name'],
            category=data['category'],
            description=data.get('description'),
            price=data.get('price'),
            unit=data.get('unit'),
            specifications=json.dumps(data.get('specifications', {})) if data.get('specifications') else None,
            availability=data.get('availability', True)
        )

        db.session.add(product)
        db.session.commit()

        return jsonify(product.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# Review Routes
@app.route('/api/resource-providers/<int:provider_id>/reviews', methods=['GET'])
def get_provider_reviews(provider_id):
    try:
        reviews = Review.query.filter_by(provider_id=provider_id).all()
        return jsonify({
            'reviews': [review.to_dict() for review in reviews]
        }), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/resource-providers/<int:provider_id>/reviews', methods=['POST'])
def create_review(provider_id):
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['user_id', 'rating']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400

        # Validate rating
        if not 1 <= data['rating'] <= 5:
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400

        review = Review(
            provider_id=provider_id,
            user_id=data['user_id'],
            rating=data['rating'],
            comment=data.get('comment')
        )

        db.session.add(review)
        db.session.commit()

        return jsonify(review.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# Existing crop trends route
@app.route('/data', methods=['POST'])
def handle_filters():
    try:
        data = request.get_json()

        crop = data.get('crop')
        state = data.get('state')
        year = data.get('year')

        if not crop:
            return jsonify({'error': 'Crop name is required'}), 400

        trend_data = trends_analyzer.get_crop_trends(crop, state, year)

        if trend_data is None:
            return jsonify({'error': 'No data found for the specified filters'}), 404

        return jsonify({'trends': trend_data}), 200

    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/api/admin/send-message', methods=['POST'])
def send_admin_message():
    try:
        data = request.get_json()
        subject = data.get('subject')
        message_content = data.get('message')
        target_roles = data.get('roles')

        if not all([subject, message_content, target_roles]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Create a new Message instance
        new_message = Message(
            subject=subject,
            content=message_content,
            recipient_roles=json.dumps(target_roles)
        )

        # Add the message to the database session and commit
        db.session.add(new_message)
        db.session.commit()

        # TODO: Add logic here to actually send notifications or messages to users
        # based on their roles. This might involve another service or background task.

        # Fetch users belonging to the target roles
        users_to_message = User.query.filter(User.role.in_(target_roles)).all()

        # Placeholder for sending logic
        for user in users_to_message:
            print(f"Would send message to user: {user.username} ({user.role})")
            # TODO: Implement actual message sending mechanism (e.g., email, in-app notification)

        return jsonify({'message': 'Message sent successfully!', 'message_id': new_message.id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to send message', 'details': str(e)}), 500

@app.route('/api/messages', methods=['GET'])
def get_user_messages():
    try:
        # In a real application, the user's role would come from authentication
        # For now, we'll get it from a query parameter for testing
        user_role = request.args.get('role')

        if not user_role:
            return jsonify({'error': 'User role is required'}), 400

        # Query messages where the user_role is in the recipient_roles JSON array
        # Using a simpler JSON query approach
        messages = Message.query.filter(
            Message.recipient_roles.like(f'%"{user_role}"%')
        ).all()

        return jsonify({
            'messages': [message.to_dict() for message in messages]
        }), 200

    except Exception as e:
        return jsonify({'error': 'Failed to retrieve messages', 'details': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
