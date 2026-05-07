package com.offercat.radar.service;

import com.offercat.radar.dto.response.QuestionnaireResponse;

import java.util.List;

public interface QuestionnaireService {
    List<QuestionnaireResponse> getAllQuestions();
}
