package com.offercat.student.service.impl;

import com.offercat.student.dao.InterviewMapper;
import com.offercat.student.dto.SubmitInterviewAnswerDTO;
import com.offercat.student.entity.InterviewQuestionBank;
import com.offercat.student.entity.StudentInterviewRecord;
import com.offercat.student.service.InterviewService;
import com.offercat.student.vo.InterviewQuestionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewServiceImpl implements InterviewService {

    @Autowired
    private InterviewMapper interviewMapper;

    @Override
    public InterviewQuestionVO getQuestionForStudent(Long studentId, Long questionId) {
        InterviewQuestionBank question = interviewMapper.getQuestionById(questionId);
        if (question == null) {
            throw new RuntimeException("Interview Question not found");
        }
        return convertToVO(question);
    }

    @Override
    public List<InterviewQuestionVO> getPaperQuestionsForStudent(Long studentId, Long paperId) {
        List<InterviewQuestionBank> questions = interviewMapper.getQuestionsByPaperId(paperId);
        return questions.stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    private InterviewQuestionVO convertToVO(InterviewQuestionBank question) {
        InterviewQuestionVO vo = new InterviewQuestionVO();
        vo.setQuestionId(question.getQuestionId());
        vo.setMajor(question.getMajor());
        vo.setQuestionType(question.getQuestionType());
        vo.setQuestionContent(question.getQuestionContent());
        return vo;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submitAnswer(SubmitInterviewAnswerDTO dto) {
        InterviewQuestionBank question = interviewMapper.getQuestionById(dto.getQuestionId());
        if (question == null) {
            throw new RuntimeException("Interview Question not found");
        }

        // Save record (AI score and feedback would ideally be calculated here, we set defaults for now)
        StudentInterviewRecord record = new StudentInterviewRecord();
        record.setStudentId(dto.getStudentId());
        record.setPaperRecordId(dto.getPaperRecordId());
        record.setQuestionId(dto.getQuestionId());
        record.setUserAnswer(dto.getUserAnswer());
        record.setAiScore(0);
        record.setAiFeedback("");
        record.setTotalScore(0);

        interviewMapper.insertStudentRecord(record);
    }
}
