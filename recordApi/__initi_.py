from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.utils.logger import logger
from app.utils.redis_client import redis_client
from app.models.message_model import db
from app.controllers.message_controller import message_bp
from app.controllers.health_controller import health_bp

def create_app():
    app = Flask(__name__)
    
    app.config.from_object('app.config.Config')
    db.init_app(app)
    
    app.register_blueprint(message_bp)
    app.register_blueprint(health_bp)

    return app
