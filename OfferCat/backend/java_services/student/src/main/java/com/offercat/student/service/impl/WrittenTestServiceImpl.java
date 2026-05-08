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

/**
 * 手写测试服务实现类
 * 功能：表示手写测试服务实现
 */
@Service
public class WrittenTestServiceImpl implements WrittenTestService {
    @Autowired
    private WrittenTestMapper writtenTestMapper;
    /**
     * 获取学生写测试的问题
     * @param studentId 学生ID
     * @param questionId 问题ID
     * @return 问题VO
     */
    @Override
    public WrittenTestQuestionVO getQuestionForStudent(Long studentId, Long questionId) {
        WrittenTestQuestionBank question = writtenTestMapper.getQuestionById(questionId);
        if (question == null) {
            throw new RuntimeException("Question not found");
        }
        return convertToVO(studentId, question);
    }

    /**
     * 获取学生写测试的所有问题
     * @param studentId 学生ID
     * @param paperId 试卷ID
     * @return 问题VO列表
     */
    @Override
    public List<WrittenTestQuestionVO> getPaperQuestionsForStudent(Long studentId, Long paperId) {
        List<WrittenTestQuestionBank> questions = writtenTestMapper.getQuestionsByPaperId(paperId);
        return questions.stream()
                .map(q -> convertToVO(studentId, q))
                .collect(Collectors.toList());
    }
    /**
     * 将问题实体转换为VO
     * @param studentId 学生ID
     * @param question 问题实体
     * @return 问题VO
     */
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
    /**
     * 提交学生写测试的答案
     * @param dto 提交答案DTO
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submitAnswer(SubmitWrittenAnswerDTO dto) {
        WrittenTestQuestionBank question = writtenTestMapper.getQuestionById(dto.getQuestionId());
        if (question == null) {
            throw new RuntimeException("Question not found");
        }

        /**
         * 获取随机选项键
         */
        List<String> shuffledKeys = getShuffledKeys(dto.getStudentId(), dto.getQuestionId());

        /**
         * 查找用户选择的选项对应的原始键
         */
        String selectedOption = dto.getSelectedOption(); // Expected "A", "B", "C", or "D"
        if (selectedOption == null || !selectedOption.matches("[A-D]")) {
            throw new IllegalArgumentException("Invalid option selected");
        }

        int selectedIndex = selectedOption.charAt(0) - 'A';
        String originalKey = shuffledKeys.get(selectedIndex);

        /**
         * 检查答案是否正确
         * @param originalKey 原始选项键
         */
        boolean isCorrect = originalKey.equalsIgnoreCase(question.getCorrectAnswer());

        /**
         * 计算成绩
         */
        int score = isCorrect ? 5 : 0;

        /**
         * 保存学生写测试记录
         * @param record 学生写测试记录实体
         */
        StudentWrittenTestRecord record = new StudentWrittenTestRecord();
        record.setStudentId(dto.getStudentId());
        record.setPaperRecordId(dto.getPaperRecordId());
        record.setQuestionId(dto.getQuestionId());
        /**
         * 保存用户选择的选项键
         */
        record.setUserAnswer(originalKey);
        record.setIsCorrect(isCorrect ? 1 : 0);
        record.setTotalScore(score);

        writtenTestMapper.insertStudentRecord(record);
    }

    /**
     * 获取随机选项键
     */
    private List<String> getShuffledKeys(Long studentId, Long questionId) {
        List<String> keys = Arrays.asList("A", "B", "C", "D");
        long seed = (studentId != null ? studentId.hashCode() : 0L) * 31L + 
                    (questionId != null ? questionId.hashCode() : 0L) * 17L;
        Collections.shuffle(keys, new Random(seed));
        return keys;
    }
    /**
     * 获取选项内容
     * @param question 问题实体
     * @param key 选项键
     * @return 选项内容
     */
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
