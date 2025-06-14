from models import db, ResourceProvider, Product
import json

def seed_resource_providers():
    """Seed the database with initial resource provider data"""
    
    providers_data = [
        {
            "name": "Mahindra Tractors",
            "category": "Agricultural Equipment",
            "subcategory": "Tractors",
            "description": "Leading manufacturer of agricultural tractors and farm equipment in India. Known for reliable and efficient farming solutions.",
            "website": "https://www.mahindra.com",
            "logo_url": "https://www.mahindra.com/-/media/project/mahindra/dotcom/images/logos/mahindra-logo.png",
            "contact_email": "contact@mahindra.com",
            "contact_phone": "+91-22-24901444",
            "address": "Mahindra Towers, Worli, Mumbai",
            "state": "Maharashtra",
            "district": "Mumbai",
            "services": ["Tractor Sales", "Equipment Maintenance", "Spare Parts", "Training Programs"],
            "certifications": ["ISO 9001", "ISO 14001", "OHSAS 18001"]
        },
        {
            "name": "Jain Irrigation Systems",
            "category": "Irrigation & Water Management",
            "subcategory": "Drip Irrigation",
            "description": "Global leader in micro-irrigation systems, providing water-efficient solutions for agriculture.",
            "website": "https://www.jains.com",
            "logo_url": "https://www.jains.com/images/logo.png",
            "contact_email": "info@jains.com",
            "contact_phone": "+91-253-2251616",
            "address": "Jain Plastic Park, Jalgaon",
            "state": "Maharashtra",
            "district": "Jalgaon",
            "services": ["Drip Irrigation Systems", "Solar Pumps", "Greenhouse Solutions", "Technical Support"],
            "certifications": ["ISO 9001", "ISO 14001", "Global GAP"]
        },
        {
            "name": "UPL Limited",
            "category": "Raw Materials",
            "subcategory": "Agrochemicals",
            "description": "Global provider of sustainable agricultural solutions, including crop protection products and seeds.",
            "website": "https://www.upl-ltd.com",
            "logo_url": "https://www.upl-ltd.com/images/upl-logo.png",
            "contact_email": "contact@upl-ltd.com",
            "contact_phone": "+91-22-66407400",
            "address": "UPL House, Bandra Kurla Complex, Mumbai",
            "state": "Maharashtra",
            "district": "Mumbai",
            "services": ["Crop Protection", "Seeds", "Post-Harvest Solutions", "Digital Agriculture"],
            "certifications": ["ISO 9001", "ISO 14001", "OHSAS 18001"]
        },
        {
            "name": "Krishidhan Seeds",
            "category": "Raw Materials",
            "subcategory": "Seeds",
            "description": "Leading seed company providing high-quality hybrid seeds for various crops.",
            "website": "https://www.krishidhan.com",
            "logo_url": "https://www.krishidhan.com/images/logo.png",
            "contact_email": "info@krishidhan.com",
            "contact_phone": "+91-20-66011000",
            "address": "Krishidhan House, Pune",
            "state": "Maharashtra",
            "district": "Pune",
            "services": ["Hybrid Seeds", "Technical Support", "Training Programs"],
            "certifications": ["ISO 9001", "ISTA"]
        },
        {
            "name": "Netafim India",
            "category": "Irrigation & Water Management",
            "subcategory": "Smart Irrigation",
            "description": "Pioneer in smart irrigation solutions, offering precision agriculture technologies.",
            "website": "https://www.netafimindia.com",
            "logo_url": "https://www.netafimindia.com/images/logo.png",
            "contact_email": "india@netafim.com",
            "contact_phone": "+91-20-71217000",
            "address": "Netafim India, Pune",
            "state": "Maharashtra",
            "district": "Pune",
            "services": ["Drip Irrigation", "Smart Farming Solutions", "Technical Support", "Training"],
            "certifications": ["ISO 9001", "ISO 14001", "Global GAP"]
        },
        {
            "name": "Escorts Kubota",
            "category": "Agricultural Equipment",
            "subcategory": "Farm Machinery",
            "description": "Manufacturer of agricultural tractors and farm equipment, known for innovative farming solutions.",
            "website": "https://www.escortsgroup.com",
            "logo_url": "https://www.escortsgroup.com/images/logo.png",
            "contact_email": "info@escortsgroup.com",
            "contact_phone": "+91-120-4609000",
            "address": "Escorts House, Faridabad",
            "state": "Haryana",
            "district": "Faridabad",
            "services": ["Tractor Sales", "Farm Equipment", "Service Support", "Spare Parts"],
            "certifications": ["ISO 9001", "ISO 14001"]
        }
    ]

    # Add providers to database
    for provider_data in providers_data:
        provider = ResourceProvider(
            name=provider_data["name"],
            category=provider_data["category"],
            subcategory=provider_data["subcategory"],
            description=provider_data["description"],
            website=provider_data["website"],
            logo_url=provider_data["logo_url"],
            contact_email=provider_data["contact_email"],
            contact_phone=provider_data["contact_phone"],
            address=provider_data["address"],
            state=provider_data["state"],
            district=provider_data["district"],
            services=json.dumps(provider_data["services"]),
            certifications=json.dumps(provider_data["certifications"])
        )
        db.session.add(provider)

    # Add some sample products
    products_data = [
        {
            "provider_id": 1,  # Mahindra Tractors
            "name": "Mahindra 575 DI",
            "category": "Tractor",
            "description": "Powerful 47 HP tractor with advanced features for modern farming",
            "price": 650000,
            "unit": "piece",
            "specifications": {
                "engine_power": "47 HP",
                "fuel_tank": "45 L",
                "transmission": "8 Forward + 2 Reverse",
                "weight": "2100 kg"
            }
        },
        {
            "provider_id": 2,  # Jain Irrigation
            "name": "Jain Drip System",
            "category": "Irrigation System",
            "description": "Complete drip irrigation system for 1 acre",
            "price": 45000,
            "unit": "set",
            "specifications": {
                "coverage": "1 acre",
                "flow_rate": "2 LPH",
                "spacing": "60 cm",
                "pressure": "1.5 kg/cm²"
            }
        }
    ]

    for product_data in products_data:
        product = Product(
            provider_id=product_data["provider_id"],
            name=product_data["name"],
            category=product_data["category"],
            description=product_data["description"],
            price=product_data["price"],
            unit=product_data["unit"],
            specifications=json.dumps(product_data["specifications"]),
            availability=True
        )
        db.session.add(product)

    try:
        db.session.commit()
        print("Successfully seeded database with initial data")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {str(e)}")

if __name__ == "__main__":
    from app import app
    with app.app_context():
        seed_resource_providers() 