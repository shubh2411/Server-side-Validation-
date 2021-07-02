const express = require("express");
const { check, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/register", (req, res) => {
	res.render("register");
});
// post request
app.post(
	"/register",
	urlencodedParser,
	[
		check("username")
			.exists()
			.isLength({ min: 3 })
			.withMessage("must be at least 5 chars long"),
		check("email", "Inavlid email address").exists().isEmail().normalizeEmail(),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const alert = errors.array();
			res.render("register", {
				alert,
			});
			console.log(alert);
		}

		// res.json(req.body);
	}
);

app.listen(5000, () => {
	console.log("server is running at //localhost:5000");
});
