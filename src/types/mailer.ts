import { Options } from "nodemailer/lib/mailer";

export interface MailOptions extends Options {
    template: string;
}
