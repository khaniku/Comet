package com.comet.survey.utility;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.time.Duration;

class DurationAdapter extends TypeAdapter<Duration> {

    @Override
    public void write(JsonWriter out, Duration value) throws IOException {
        if (value == null)
            out.nullValue();
        else
            out.value(value.getSeconds());
    }

    @Override
    public Duration read(JsonReader in) throws IOException {
        if (in != null)
            return Duration.ofSeconds(in.nextLong());
        else
            return null;
    }

}