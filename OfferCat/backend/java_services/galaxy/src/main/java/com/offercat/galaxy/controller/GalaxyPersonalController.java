package com.offercat.galaxy.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.offercat.galaxy.common.ResponseResult;
import com.offercat.galaxy.dto.PersonalGalaxySaveRequest;
import com.offercat.galaxy.service.PersonalGalaxyService;
import com.offercat.galaxy.util.PackKeyUtil;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/galaxy/personal")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GalaxyPersonalController {

    private final PersonalGalaxyService personalGalaxyService;
    @GetMapping
    public ResponseResult<JsonNode> get(@RequestParam("userId") long userId) throws Exception {
        JsonNode data = personalGalaxyService.load(userId);
        if (data == null) {
            return ResponseResult.error(404, "尚未保存个人星图");
        }
        return ResponseResult.success(data);
    }

    @PutMapping
    public ResponseResult<Void> save(@Valid @RequestBody PersonalGalaxySaveRequest req) {
        personalGalaxyService.save(req.getUserId(), req.getGalaxy());
        return ResponseResult.success(null);
    }

    @DeleteMapping
    public ResponseResult<Void> delete(@RequestParam("userId") long userId) {
        personalGalaxyService.delete(userId);
        return ResponseResult.success(null);
    }

    /**
     * 从已保存星图推导本题库包 pack_key 列表（供排行榜「本图合计」筛选）。
     */
    @GetMapping("/pack-keys")
    public ResponseResult<List<String>> packKeys(@RequestParam("userId") long userId) throws Exception {
        JsonNode galaxy = personalGalaxyService.load(userId);
        if (galaxy == null || !galaxy.has("fusions")) {
            return ResponseResult.success(List.of());
        }
        JsonNode fusions = galaxy.get("fusions");
        JsonNode majors = galaxy.get("majors");
        List<String> keys = new ArrayList<>();
        if (fusions.isArray()) {
            for (JsonNode f : fusions) {
                String pk = PackKeyUtil.fromFusionNode(f, majors);
                if (pk != null && !keys.contains(pk)) {
                    keys.add(pk);
                }
            }
        }
        return ResponseResult.success(keys);
    }
}
