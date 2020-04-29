import * as nodemailer from "nodemailer";
import * as hbs from "nodemailer-express-handlebars";
import { env } from "@utils";

const transporter = nodemailer.createTransport({
    host: env.get("mail_host"),

    /**
     * transforming port to number, this solves the type issue on host property
     */
    port: Number(env.get("mail_port")) || 0,
    auth: {
        user: env.get("mail_user"),
        pass: env.get("mail_password"),
    },
});

transporter.use(
    "compile",
    hbs({
        viewEngine: {
            extName: ".hbs",
            defaultLayout: false,
            layoutsDir: "./src/templates",
            partialsDir: "./src/templates",
        },
        viewPath: "./src/templates",
        extName: ".hbs",
    })
);
export const mailer = transporter;
