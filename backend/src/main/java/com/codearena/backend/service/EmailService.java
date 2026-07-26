package com.codearena.backend.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

@Service
public class EmailService {

    private static final Logger logger =
            LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegistrationConfirmation(
            String receiverEmail,
            String username) {

        String safeUsername =
                HtmlUtils.htmlEscape(username);

        String htmlContent = createEmailTemplate(
                "Registration Successful",
                safeUsername,
                "Your CodeArena account has been created successfully.",
                "You can now log in, explore coding problems "
                        + "and submit your solutions.",
                "Start practising and improve your problem-solving skills."
        );

        sendEmail(
                receiverEmail,
                "Welcome to CodeArena",
                htmlContent,
                "Registration"
        );
    }

    public void sendLoginConfirmation(
            String receiverEmail,
            String username) {

        String safeUsername =
                HtmlUtils.htmlEscape(username);

        String htmlContent = createEmailTemplate(
                "Login Successful",
                safeUsername,
                "You have successfully logged in to your "
                        + "CodeArena account.",
                "If this login was not made by you, "
                        + "please change your password immediately.",
                "Keep practising and continue improving your coding skills."
        );

        sendEmail(
                receiverEmail,
                "CodeArena Login Successful",
                htmlContent,
                "Login"
        );
    }

    private void sendEmail(
            String receiverEmail,
            String subject,
            String htmlContent,
            String emailType) {

        try {
            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            false,
                            "UTF-8"
                    );

            helper.setFrom(senderEmail, "CodeArena");
            helper.setReplyTo(senderEmail);
            helper.setTo(receiverEmail);
            helper.setSubject(subject);

            // true means the content is HTML.
            helper.setText(htmlContent, true);

            mailSender.send(message);

            logger.info(
                    "{} email sent successfully to {}",
                    emailType,
                    receiverEmail
            );

        } catch (Exception exception) {

            // Registration or login will continue
            // even if email sending fails.
            logger.error(
                    "Unable to send {} email to {}",
                    emailType,
                    receiverEmail,
                    exception
            );
        }
    }

    private String createEmailTemplate(
            String heading,
            String username,
            String mainMessage,
            String highlightedMessage,
            String closingMessage) {

        return """
                <!DOCTYPE html>
                <html>
                <body style="
                    margin: 0;
                    padding: 30px 15px;
                    background-color: #f4f6f8;
                    font-family: Arial, Helvetica, sans-serif;
                ">

                    <div style="
                        max-width: 620px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 12px;
                        overflow: hidden;
                    ">

                        <div style="
                            background-color: #ff6b00;
                            padding: 30px;
                            text-align: center;
                        ">

                            <h1 style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 32px;
                            ">
                                CodeArena
                            </h1>

                            <p style="
                                margin: 8px 0 0;
                                color: #ffffff;
                                font-size: 17px;
                            ">
                                Coding Practice Platform
                            </p>

                        </div>

                        <div style="
                            padding: 36px;
                            color: #222222;
                        ">

                            <h2 style="
                                margin: 0 0 24px;
                                font-size: 26px;
                                color: #222222;
                            ">
                                %s
                            </h2>

                            <p style="
                                margin: 0 0 18px;
                                font-size: 18px;
                                line-height: 1.7;
                            ">
                                Hello <strong>%s</strong>,
                            </p>

                            <p style="
                                margin: 0 0 22px;
                                font-size: 18px;
                                line-height: 1.7;
                            ">
                                %s
                            </p>

                            <div style="
                                margin: 24px 0;
                                padding: 18px;
                                background-color: #fff4ec;
                                border-left: 5px solid #ff6b00;
                                border-radius: 6px;
                            ">

                                <p style="
                                    margin: 0;
                                    font-size: 17px;
                                    line-height: 1.7;
                                ">
                                    %s
                                </p>

                            </div>

                            <p style="
                                margin: 22px 0;
                                font-size: 17px;
                                line-height: 1.7;
                            ">
                                %s
                            </p>

                            <p style="
                                margin: 30px 0 0;
                                font-size: 17px;
                                line-height: 1.7;
                            ">
                                Regards,<br>
                                <strong>CodeArena Team</strong>
                            </p>

                        </div>

                        <div style="
                            background-color: #1f2937;
                            padding: 18px;
                            text-align: center;
                        ">

                            <p style="
                                margin: 0;
                                color: #d1d5db;
                                font-size: 14px;
                            ">
                                This is an automated notification
                                from CodeArena.
                            </p>

                        </div>

                    </div>

                </body>
                </html>
                """.formatted(
                heading,
                username,
                mainMessage,
                highlightedMessage,
                closingMessage
        );
    }
}