from flask import Blueprint, jsonify
from app.models.message_model import db
from app.utils.redis_client import redis_client
from app.utils.logger import logger

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    try:
        db.session.execute('SELECT 1')
        redis_client.ping()
        return jsonify({'status': 'healthy'}), 200
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500
