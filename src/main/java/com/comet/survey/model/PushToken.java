package com.comet.survey.model;

import com.comet.survey.utility.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Data
@Entity
@Table(name = "device_push_token")
public class PushToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;
    private String token;
    private String brand;

    public PushToken() {

    }

    public PushToken(String token, String brand) {
        this.token = token;
        this.brand = brand;
    }

    public void sendNotifications(List<PushToken> pushTokens, String survey)  {

        // Sending message
        List<Message> messages = new ArrayList<>();
        // You can check whether your push tokens are syntactically valid
        for (PushToken token : pushTokens) {
            // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
            if (!ExpoPushClient.isExpoPushToken(token.getToken())) {
                System.out.println(token + " is not a valid Expo Push Token!");
            }
        }
        for (PushToken token : pushTokens) {
            // Construct a message
            Message message = new Message.Builder()
                    .to(token.getToken())
                    .title("Survey assigned to you!")
                    .body(survey)
                    .build();
            messages.add(message);
        }
        // The Expo push service accepts batches of messages, no more than 100 at a time.
        // If you know you're sending more than 100 messages,
        // Use ExpoPushClient.chunkItems to get lists of 100 or less items
        List<List<Message>> chunks = ExpoPushClient.chunkItems(messages);

        for (List<Message> chunk : chunks) {
            try {
                PushTicketResponse response = ExpoPushClient.sendPushNotifications(messages);
                List<ExpoError> errors = response.getErrors();
                // If there is an error with the *entire request*:
                // The errors object will be an list of errors,
                // (usually just one)
                if (errors != null) {
                    for (ExpoError error : errors) {
                        // Handle the errors
                    }
                }
                // If there are errors that affect individual messages but not the entire request,
                // errors will be null and each push ticket will individually contain the status
                // of each message (ok or error)
                List<PushTicket> tickets = response.getTickets();
                if (tickets != null) {
                    for (PushTicket ticket : tickets) {
                        // Handle each ticket (namely, check the status, and save the ID!)
                        // NOTE: If a ticket status is error, you can get the specific error
                        // from the details object. You must handle it appropriately.
                        // The error codes are listed in PushError
                        if (ticket.getStatus() == Status.OK) {
                            String id = ticket.getId();
                            // Save this id somewhere for later
                        } else {
                            // Handle the error
                            PushError e = ticket.getDetails().getError();
                            switch (e) {
                                case MESSAGE_TOO_BIG:
                                case INVALID_CREDENTIALS:
                                case DEVICE_NOT_REGISTERED:
                                case MESSAGE_RATE_EXCEEDED:
                            }

                        }
                    }
                }
            } catch (IOException e) {
                // Handle a network error here
                System.out.println(e.getMessage());
            }
        }

        // Later, you can get the Push Receipts using the ids you saved from above.
        // Usually, the receipts are available within a few seconds, but when Expo is under load,
        // it can take up to 30 min. Push Reciepts are available for at least 1 day
        List<String> ids = new ArrayList<>();
        ids.add("xxxxxxx-yyyy-yyyy-yyyy-xyxyxyxyxyxy");
        try {
            PushReceiptResponse response = ExpoPushClient.getPushReciepts(ids);
            Map<String, PushReceipt> receipts = response.getReceipts();
            for (String id : ids) {
                PushReceipt rec = receipts.get(id);
                if (rec != null) {
                    if (rec.getStatus() == Status.OK) {
                        // It's all good!
                    } else {
                        // Handle the error
                        PushError e = rec.getDetails().getError();
                        switch (e) {
                            case MESSAGE_TOO_BIG:
                            case INVALID_CREDENTIALS:
                            case DEVICE_NOT_REGISTERED:
                            case MESSAGE_RATE_EXCEEDED:
                        }
                    }
                }
            }
        } catch (IOException e) {
            // Handle a network error here
            System.out.println(e.getMessage());
        }
    }
}
