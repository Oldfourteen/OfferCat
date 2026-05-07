package com.offercat.student.service.impl;

import com.offercat.student.dao.WrittenTestMapper;
import com.offercat.student.dto.SubmitWrittenAnswerDTO;
import com.offercat.student.entity.StudentWrittenTestRecord;
import com.offercat.student.entity.WrittenTestQuestionBank;
import com.offercat.student.service.WrittenTestService;
import com.offercat.student.vo.WrittenTestQuestionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import java.util.stream.Collectors;

@Service
public class WrittenTestServiceImpl implements WrittenTestService {

    @Autowired
    private WrittenTestMapper writtenTestMapper;

    @Override
    public WrittenTestQuestionVO getQuestionForStudent(Long studentId, Long questionId) {
        WrittenTestQuestionBank question = writtenTestMapper.getQuestionById(questionId);
        if (question == null) {
            throw new RuntimeException("Question not found");
        }
        return convertToVO(studentId, question);
    }

    @Override
    public List<WrittenTestQuestionVO> getPaperQuestionsForStudent(Long studentId, Long paperId) {
        List<WrittenTestQuestionBank> questions = writtenTestMapper.getQuestionsByPaperId(paperId);
        return questions.stream()
                .map(q -> convertToVO(studentId, q))
                .collect(Collectors.toList());
    }

    private WrittenTestQuestionVO convertToVO(Long studentId, WrittenTestQuestionBank question) {
        // Get shuffled keys based on studentId and questionId to ensure deterministic randomization
        List<String> shuffledKeys = getShuffledKeys(studentId, question.getQuestionId());

        WrittenTestQuestionVO vo = new WrittenTestQuestionVO();
        vo.setQuestionId(question.getQuestionId());
        vo.setMajor(question.getMajor());
        vo.setPaperSet(question.getPaperSet());
        vo.setQuestionType(question.getQuestionType());
        vo.setQuestionContent(question.getQuestionContent());

        // Assign shuffled options to A, B, C, D
        vo.setOptionA(getOptionContent(question, shuffledKeys.get(0)));
        vo.setOptionB(getOptionContent(question, shuffledKeys.get(1)));
        vo.setOptionC(getOptionContent(question, shuffledKeys.get(2)));
        vo.setOptionD(getOptionContent(question, shuffledKeys.get(3)));

        return vo;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submitAnswer(SubmitWrittenAnswerDTO dto) {
        WrittenTestQuestionBank question = writtenTestMapper.getQuestionById(dto.getQuestionId());
        if (question == null) {
            throw new RuntimeException("Question not found");
        }

        // Re-generate the deterministic shuffled keys
        List<String> shuffledKeys = getShuffledKeys(dto.getStudentId(), dto.getQuestionId());

        // Find the original key corresponding to the user's selected option
        String selectedOption = dto.getSelectedOption(); // Expected "A", "B", "C", or "D"
        if (selectedOption == null || !selectedOption.matches("[A-D]")) {
            throw new IllegalArgumentException("Invalid option selected");
        }

        int selectedIndex = selectedOption.charAt(0) - 'A';
        String originalKey = shuffledKeys.get(selectedIndex);

        // Check correctness against the original correct answer
        boolean isCorrect = originalKey.equalsIgnoreCase(question.getCorrectAnswer());

        // Calculate score (assuming each question is 5 points for demonstration)
        int score = isCorrect ? 5 : 0;

        // Save record
        StudentWrittenTestRecord record = new StudentWrittenTestRecord();
        record.setStudentId(dto.getStudentId());
        record.setPaperRecordId(dto.getPaperRecordId());
        record.setQuestionId(dto.getQuestionId());
        // Save the original option key so it matches the correctAnswer in the question bank table
        record.setUserAnswer(originalKey);
        record.setIsCorrect(isCorrect ? 1 : 0);
        record.setTotalScore(score);

        writtenTestMapper.insertStudentRecord(record);
    }

    /**
     * Deterministically shuffle the options "A", "B", "C", "D" based on a seed derived from studentId and questionId
     */
    private List<String> getShuffledKeys(Long studentId, Long questionId) {
        List<String> keys = Arrays.asList("A", "B", "C", "D");
        long seed = (studentId != null ? studentId.hashCode() : 0L) * 31L + 
                    (questionId != null ? questionId.hashCode() : 0L) * 17L;
        Collections.shuffle(keys, new Random(seed));
        return keys;
    }

    private String getOptionContent(WrittenTestQuestionBank question, String key) {
        switch (key) {
            case "A": return question.getOptionA();
            case "B": return question.getOptionB();
            case "C": return question.getOptionC();
            case "D": return question.getOptionD();
            default: return "";
        }
    }
}
