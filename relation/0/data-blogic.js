var data = {
    "nodes": [{
        "name": "存量营销(同网)",
        "image": "img/user.png",
        "key": "11"
    }, {
        "name": "营销活动接口服务",
        "image": "img/tomcat.png",
        "key": "22"
    }, {
        "name": "用户划配",
        "image": "img/mysql.png",
        "key": "33"
    }, {
        "name": "短信接口服务",
        "image": "img/user.png",
        "key": "44"
    }, {
        "name": "短信渠道",
        "image": "img/mysql.png",
        "key": "55"
    }, {
        "name": "工单中心",
        "image": "img/tomcat.png",
        "key": "00"
    }],
    "edges": [{
        "source": "00",
        "target": "11",
        "relation": "1718",
        "status": "fast"
    }, {
        "source": "00",
        "target": "33",
        "relation": "1718",
        "status": "fast"
    }, {
        "source": "22",
        "target": "44",
        "relation": "1718",
        "status": "slow"
    }, {
        "source": "22",
        "target": "33",
        "relation": "1718",
        "status": "slow"
    }, {
        "source": "33",
        "target": "55",
        "relation": "1718",
        "status": "normal"
    }, {
        "source": "22",
        "target": "22",
        "relation": "1718",
        "status": "slow"
    }, {
        "source": "55",
        "target": "33",
        "relation": "1718",
        "status": "slow"
    }]
};