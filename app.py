import os

from flask import Flask, render_template, session, request, redirect
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
def home():
    """Initial landing page; logs off dev"""
    session.clear()
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """GET: Display login page
       POST: Redirect user to dev page"""

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if username == "dev" and password == "eloper":
            session["user_id"] = username
            return redirect("/dev")
        else:
            return render_template("login.html", message="Access denied")
    elif request.method == "GET":
        return render_template("login.html")


@app.route("/dev")
def dev():
    """Developer page to view and add phrases; requires login"""
    user_id = session.get("user_id")
    if user_id is None:
        return render_template("login.html")

    # Get all categories
    categories = db.execute("SELECT category FROM phrases GROUP BY category").fetchall()
    return render_template("dev.html", categories=categories)


@app.route("/game")
def game():
    """Displays game page with start/next button and current phrase"""
    phrases = db.execute("SELECT phrase FROM phrases").fetchall()
    data = []
    for phrase in phrases:
        data.append(phrase[0])
    return render_template("game.html", data=data)
