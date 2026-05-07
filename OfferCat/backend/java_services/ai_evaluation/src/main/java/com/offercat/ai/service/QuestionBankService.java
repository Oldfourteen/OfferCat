package com.offercat.ai.service;

import com.offercat.ai.dto.request.QuestionBankRequest;
import com.offercat.ai.dto.request.SubmitAnswerRequest;
import com.offercat.ai.dto.response.QuestionBankResponse;
import com.offercat.ai.dto.response.SubmitAnswerResponse;
import java.util.List;

public interface QuestionBankService {
    
    QuestionBankResponse getQuestions(QuestionBankRequest request);
    
    SubmitAnswerResponse submitAnswer(SubmitAnswerRequest request);
    
    byte[] generatePdf(QuestionBankRequest request);
    
    void initializeQuestionBank();
    
    List<String> getAllSubjects();
}
