package com.offercat.galaxy.service;

import com.offercat.galaxy.dto.StarlitLeaderboardResponse;
import com.offercat.galaxy.dto.StarlitLeaderboardRowDto;
import com.offercat.galaxy.dto.StarlitProgressRowDto;
import com.offercat.galaxy.dto.StarlitProgressUpsertRequest;
import com.offercat.galaxy.dto.StarlitQuestionDto;
import com.offercat.galaxy.dto.StarlitQuestionRow;
import com.offercat.galaxy.mapper.StarlitMapper;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StarlitService {

    private final StarlitMapper starlitMapper;

    public List<StarlitQuestionDto> questionsByPackKey(String packKey) {
        Long packId = starlitMapper.selectPackIdByKey(packKey.trim());
        if (packId == null) {
            throw new IllegalArgumentException("未知 packKey: " + packKey);
        }
        List<StarlitQuestionRow> rows = starlitMapper.selectQuestionsByPackId(packId);
        if (rows == null) {
            return List.of();
        }
        List<StarlitQuestionDto> out = new ArrayList<>();
        for (StarlitQuestionRow row : rows) {
            List<String> options = List.of(row.getOptionA(), row.getOptionB(), row.getOptionC(), row.getOptionD());
            int correctIndex = letterToIndex(row.getCorrectAnswer());
            out.add(new StarlitQuestionDto(
                    row.getQuestionNo() == null ? 0 : row.getQuestionNo(),
                    row.getStem(),
                    options,
                    correctIndex));
        }
        return out;
    }

    public List<StarlitProgressRowDto> progressByUser(long userId) {
        List<StarlitProgressRowDto> rows = starlitMapper.selectProgressByUser(userId);
        return rows == null ? List.of() : rows;
    }

    private static int letterToIndex(String letter) {
        if (letter == null) {
            return 0;
        }
        return switch (letter.trim().toUpperCase()) {
            case "A" -> 0;
            case "B" -> 1;
            case "C" -> 2;
            case "D" -> 3;
            default -> 0;
        };
    }

    public void upsertProgress(StarlitProgressUpsertRequest req) {
        Long packId = starlitMapper.selectPackIdByKey(req.getPackKey().trim());
        if (packId == null) {
            throw new IllegalArgumentException("未知 packKey: " + req.getPackKey());
        }
        starlitMapper.upsertProgress(req.getUserId(), packId, req.getStarsLit(), req.getLastQuestionNo());
    }

    public StarlitLeaderboardResponse leaderboard(long userId, int limit, List<String> packKeys) {
        int cap = Math.min(Math.max(limit, 1), 100);
        List<String> keys = normalizePackKeys(packKeys);

        List<StarlitLeaderboardRowDto> raw = starlitMapper.selectLeaderboard(cap, keys.isEmpty() ? null : keys);
        if (raw == null) {
            raw = Collections.emptyList();
        }

        long selfTotal = keys.isEmpty()
                ? starlitMapper.sumStarsByUser(userId)
                : starlitMapper.sumStarsByUserAndPackKeys(userId, keys);

        List<StarlitLeaderboardResponse.Row> rows = new ArrayList<>();
        Long selfRank = null;
        int rank = 1;
        for (StarlitLeaderboardRowDto dto : raw) {
            boolean self = dto.getUserId() != null && dto.getUserId() == userId;
            if (self) {
                selfRank = (long) rank;
            }
            rows.add(new StarlitLeaderboardResponse.Row(
                    rank++,
                    dto.getUserId(),
                    dto.getDisplayName(),
                    dto.getTotalStars() == null ? 0L : dto.getTotalStars(),
                    self));
        }

        if (selfRank == null && selfTotal > 0) {
            selfRank = null;
        }

        long canvasTotal = keys.isEmpty() ? selfTotal : starlitMapper.sumStarsByUserAndPackKeys(userId, keys);

        return new StarlitLeaderboardResponse(rows, selfTotal, selfRank, canvasTotal);
    }

    private static List<String> normalizePackKeys(List<String> packKeys) {
        if (packKeys == null || packKeys.isEmpty()) {
            return List.of();
        }
        List<String> out = new ArrayList<>();
        for (String k : packKeys) {
            if (k != null && !k.isBlank()) {
                out.add(k.trim());
            }
        }
        return out;
    }
}
