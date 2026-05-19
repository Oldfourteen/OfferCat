from flask import Flask, request, jsonify, Response
import requests
import pickle
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import io
import base64
import math

app = Flask(__name__)

# 加载模型
with open('calibration_models.pkl', 'rb') as f:
    obj = pickle.load(f)
models = obj['models']
scaler = obj['scaler']

# 维度名称（与C++中的D1~D7对应）
DIM_NAMES = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"]

# 内部 C++ 服务的地址（提供理论原始分和有效性，端口是 22565）
CPP_INTERNAL_URL = "http://localhost:22565/radar"

def call_cpp_internal(answers):
    """调用内部 C++ 服务，返回 (valid, full_scores)"""
    resp = requests.post(CPP_INTERNAL_URL, json={'answers': answers})
    if resp.status_code != 200:
        raise Exception(f"C++ service error: {resp.status_code}")
    data = resp.json()
    return data['valid'], data['full_scores']

def top5_from_scores(scores):
    """根据7个分数返回前五维度（降序）"""
    items = list(zip(DIM_NAMES, scores))
    items.sort(key=lambda x: x[1], reverse=True)
    return [{'dimension': name, 'score': score} for name, score in items[:5]]

@app.route('/radar', methods=['POST'])
def radar():
    req_data = request.get_json()
    if not req_data or 'answers' not in req_data:
        return jsonify({'error': 'Missing answers field'}), 400
    answers = req_data['answers']
    if len(answers) != 40:
        return jsonify({'error': 'answers must have 40 elements'}), 400

    # 1. 调用内部 C++ 服务（22566）获取理论原始分和有效性
    try:
        valid, raw_scores = call_cpp_internal(answers)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    if not valid:
        return jsonify({'error': 'Invalid questionnaire'}), 400

    # 2. 校准：标准化 + 预测
    raw_array = np.array(raw_scores).reshape(1, -1)
    raw_scaled = scaler.transform(raw_array)
    calibrated = []
    for model in models:
        pred = model.predict(raw_scaled)[0]
        calibrated.append(int(round(pred)))
    exp_top5 = top5_from_scores(calibrated)

    # 3. 返回经验雷达图的 top5（单独 JSON）
    return jsonify({'top5': exp_top5})

DIM_LABELS = {
    "D1": "专业能力", "D2": "项目经验", "D3": "竞赛成果",
    "D4": "学历背景", "D5": "软技能",   "D6": "行业认知", "D7": "抗压执行"
}

@app.route('/radar-chart', methods=['POST'])
def radar_chart():
    req_data = request.get_json()
    if not req_data:
        return jsonify({'error': 'Missing json body'}), 400

    # 如果有 full_scores，则先进行标准化和预测，得到 top5
    if 'full_scores' in req_data:
        raw_scores = req_data['full_scores']
        raw_array = np.array(raw_scores).reshape(1, -1)
        raw_scaled = scaler.transform(raw_array)
        calibrated = []
        for model in models:
            pred = model.predict(raw_scaled)[0]
            calibrated.append(int(round(pred)))
        top5 = top5_from_scores(calibrated)
    elif 'top5' in req_data:
        top5 = req_data['top5']
    else:
        return jsonify({'error': 'Missing full_scores or top5 field'}), 400

    if not top5:
        return jsonify({'error': 'top5 list is empty'}), 400

    labels = [DIM_LABELS.get(item.get('dimension', ''), item.get('dimension', '')) for item in top5]
    scores = [min(max(int(item.get('score', 0)), 0), 100) for item in top5]

    N = len(labels)
    angles = [math.pi / 2 + 2 * math.pi * i / N for i in range(N)]
    angles_closed = angles + [angles[0]]
    scores_closed = scores + [scores[0]]
    xs = [scores_closed[i] * math.cos(angles_closed[i]) for i in range(len(scores_closed))]
    ys = [scores_closed[i] * math.sin(angles_closed[i]) for i in range(len(scores_closed))]

    fig, ax = plt.subplots(figsize=(5, 5), subplot_kw=dict(aspect='equal'))
    fig.patch.set_facecolor('#f5f7fb')
    ax.set_facecolor('#f5f7fb')

    max_val = 100
    grid_levels = [20, 40, 60, 80, 100]
    for lvl in grid_levels:
        gx = [lvl * math.cos(a) for a in angles] + [lvl * math.cos(angles[0])]
        gy = [lvl * math.sin(a) for a in angles] + [lvl * math.sin(angles[0])]
        ax.plot(gx, gy, color='#d0d5e8', linewidth=0.6, zorder=1)

    for a in angles:
        ax.plot([0, max_val * math.cos(a)], [0, max_val * math.sin(a)],
                color='#d0d5e8', linewidth=0.6, zorder=1)

    ax.fill(xs[:-1], ys[:-1], alpha=0.35, color='#4a67f7', zorder=2)
    ax.plot(xs, ys, color='#4a67f7', linewidth=2, zorder=3)

    for i in range(N):
        x_dot = scores[i] * math.cos(angles[i])
        y_dot = scores[i] * math.sin(angles[i])
        ax.plot(x_dot, y_dot, 'o', color='#4a67f7', markersize=5, zorder=4)

    for i, (label, angle) in enumerate(zip(labels, angles)):
        x_label = (max_val + 14) * math.cos(angle)
        y_label = (max_val + 14) * math.sin(angle)
        ha = 'center'
        if math.cos(angle) > 0.3:
            ha = 'left'
        elif math.cos(angle) < -0.3:
            ha = 'right'
        va = 'center'
        if math.sin(angle) > 0.3:
            va = 'bottom'
        elif math.sin(angle) < -0.3:
            va = 'top'
        ax.text(x_label, y_label, label, ha=ha, va=va,
                fontsize=8, color='#374151', fontweight='bold')

    ax.set_xlim(-130, 130)
    ax.set_ylim(-130, 130)
    ax.axis('off')
    plt.tight_layout(pad=0.5)

    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=150, bbox_inches='tight',
                facecolor=fig.get_facecolor())
    plt.close(fig)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')

    return jsonify({
        'imageBase64': img_base64,
        'top5': top5
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=15000)