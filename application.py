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

    # Get all categories
    categories = db.execute("SELECT category FROM phrases GROUP BY category").fetchall()
    return render_template("index.html", categories=categories)


@app.route("/game")
def game():
    """Displays game page with start/next button and current phrase"""
    category = request.args.get("category")

    # Handle Animal Alliterations category
    if category == "Animal Alliterations":
        dbAdjs = db.execute("SELECT adjective FROM adjectives").fetchall()
        adjs = []
        for adj in dbAdjs:
            adjs.append(adj[0])
        dbNouns = db.execute("SELECT noun FROM nouns").fetchall()
        nouns = []
        for noun in dbNouns:
            nouns.append(noun[0])
        return render_template("allit-game.html", adjs=adjs, nouns=nouns, category=category)

    # Handle categories other than Animal Alliterations
    else:
        phrases = db.execute("SELECT phrase FROM phrases WHERE category=:category", {"category": category}).fetchall()
        data = []
        for phrase in phrases:
            data.append(phrase[0].title())
        return render_template("game.html", data=data, category=category)


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

    phrases = db.execute("SELECT phrase FROM phrases").fetchall()
    categories = db.execute("SELECT category FROM phrases GROUP BY category").fetchall()
    adjectives = db.execute("SELECT adjective FROM adjectives").fetchall()
    nouns = db.execute("SELECT noun FROM nouns").fetchall()

    return render_template("dev.html", phrases=phrases, categories=categories, adjectives=adjectives, nouns=nouns)

    # Get all categories
    # categories = db.execute("SELECT category FROM phrases GROUP BY category").fetchall()
    # return render_template("dev.html", categories=categories)


@app.route("/add-adj-n", methods=["POST"])
def add_adj_n():
    """Add user-supplied adjective and/or noun to database with title case"""
    adj = request.form.get("adjective").title()
    noun = request.form.get("noun").title()
    if adj != "":
        db.execute("INSERT INTO adjectives (adjective) VALUES (:adj)", {"adj": adj})
    if noun != "":
        db.execute("INSERT INTO nouns (noun) VALUES (:noun)", {"noun": noun})
    db.commit()

    return redirect("/dev")


@app.route("/add-phrase", methods=["POST"])
def add_phrase():
    """Add user-supplied phrase and category to database with title case"""
    phrase = request.form.get("phrase").title()
    category = request.form.get("category").title()
    if phrase != "":
        db.execute("INSERT INTO phrases (phrase, category) \
            VALUES (:phrase, :category)", {"phrase": phrase, "category": category})
        db.commit()
    return redirect("/dev")
