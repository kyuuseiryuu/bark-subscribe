
## 这是个啥

这就是是个订阅 bark 通知的东西。<del>不知道这么讲准不准确</del>


## 首先  

[Bark](https://github.com/) 是个好东西，但是有时候，埋点通知做好了，突然想增加通知设备。那么再去修改代码显得有点麻烦。

那么，有没有一种可能，写一个 webhook，回调这个 URL 那么多台设备都会收到 bark 通知。

### 于是乎

我有了以下需求
- 一个微服务，记录 bark ID
- 回调 webhook，被记录的 bark ID 都会收到通知
- 被这个 webhook 通知的 bark 设备可以增加或减少
- 最好这个 webhook 何以被分类
- API 最好与 bark 一致，这样调用端使用更有透明感

再然后就有了这个

## 这玩意儿的逻辑

- 先注册一个事件，获得事件 ID
- 使用 `bark ID` 和 `事件 ID` 订阅事件

## 调用方式：

- `Bark App` 中设置不需要改变
- 调用讲 bark 的 `webhook 地址` 改成此服务的地址
- 原来 `Bark ID` 的位置，换成 `事件 ID`

## 使用方式

[docker registry](https://hub.docker.com/repository/docker/kyuuseiryuu/bark_subscribe)

docker-compose.yml
```yaml
version: "3.0"
services:
  bark-subscribe:
    container_name: bark_subscribe
    image: kyuuseiryuu/bark_subscribe:lates
    environment:
      DOMAIN:
      BARK_SERVER:
    ports:
      - 3000:3000 
```

用这个配置文件，直接用 docker-compose 跑吧

## API

项目跑起来，首页就是，文档实在写不来。
