package com.offercat.radar.service.implement;

import com.offercat.radar.dao.QuestionnaireQuestionMapper;
import com.offercat.radar.dto.response.QuestionnaireResponse;
import com.offercat.radar.entity.QuestionnaireQuestion;
import com.offercat.radar.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionnaireServiceImplement implements QuestionnaireService {

    @Autowired
    private QuestionnaireQuestionMapper questionMapper;

    @Override
    public List<QuestionnaireResponse> getAllQuestions() {
        List<QuestionnaireQuestion> questions = questionMapper.selectAllQuestions();
        return questions.stream().map(q -> {
            QuestionnaireResponse res = new QuestionnaireResponse();
            res.setId(q.getQuestionOrder());
            res.setTitle(q.getQuestionText());
            
            List<QuestionnaireResponse.Option> options = new ArrayList<>();
            options.add(new QuestionnaireResponse.Option("A", q.getOptionA()));
            options.add(new QuestionnaireResponse.Option("B", q.getOptionB()));
            options.add(new QuestionnaireResponse.Option("C", q.getOptionC()));
            options.add(new QuestionnaireResponse.Option("D", q.getOptionD()));
            res.setOptions(options);
            
            return res;
        }).collect(Collectors.toList());
    }
}
