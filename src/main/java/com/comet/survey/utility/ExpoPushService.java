package com.comet.survey.utility;

import retrofit2.*;
import retrofit2.http.*;

import java.util.List;

interface ExpoPushService {

    @POST("push/send")
    Call<PushTicketResponse> sendNotifications(@Body List<Message> messages);

    @POST("push/getReceipts")
    Call<PushReceiptResponse> getReceipts(@Body PushReceiptRequest request);

}
