export const appConfigs = {
  "桌面launcher": {
    applicationID: "com.baidu.educloud.business.launcher",
    applicationName: "桌面launcher"
  },
  "长者信息": {
    applicationID: "com.baidu.acsp.elderinfo",
    applicationName: "长者信息"
  },
  "社区服务": {
    applicationID: "com.baidu.acsp.elderservice",
    applicationName: "社区服务"
  },
  "社区团购": {
    applicationID: "com.baidu.acsp.eldershop",
    applicationName: "社区团购"
  },
  "社区食堂": {
    applicationID: "com.baidu.acsp.elderfood",
    applicationName: "社区食堂"
  },
  "政策新闻": {
    applicationID: "com.baidu.acsp.eldernews",
    applicationName: "政策新闻"
  },
  "社区视频": {
    applicationID: "com.baidu.acsp.eldervideocls",
    applicationName: "社区视频"
  },
  "社区活动": {
    applicationID: "com.baidu.acsp.communityactivity",
    applicationName: "社区活动"
  },
  "每日签到": {
    applicationID: "com.baidu.acsp.dailysignin",
    applicationName: "每日签到"
  },
  "积分商城": {
    applicationID: "com.baidu.acsp.pointsmall",
    applicationName: "积分商城"
  },
  "社区直播": {
    applicationID: "com.baidu.acsp.live",
    applicationName: "社区直播"
  }
};

export const logTypes = [
  'CodePush',
  'SseEvent',
  'SignalServiceImpl',
  'AppRouter',
  'Fetch',
  'Trace',
  'Call-Mode',
  'AppContainer'
];

export const commands = {
  adb: {
    title: 'ADB 命令',
    commands: [
      {
        name: '查看日志',
        command: 'adb logcat | grep {logType}',
        hasLogTypeSelect: true,
      },
      {
        name: 'CodePush日志',
        command: 'adb logcat | grep CodePush',
      },
      {
        name: '查找包名',
        command: 'adb shell pm list packages | grep com.baidu.acsp',
      },
      {
        name: '查看版本号',
        command: 'adb shell dumpsys package {package} | grep versionName',
        hasPackageSelect: true,
      },
      {
        name: '启动应用',
        command: 'adb shell am start -n {package}/.MainActivity',
        hasPackageSelect: true,
      }
    ]
  },
  git: {
    title: 'Git 命令',
    commands: [
      {
        name: '提交代码到master',
        command: 'git push origin HEAD:refs/for/master',
      }
    ]
  },
  build: {
    title: '打包命令',
    commands: [
      {
        name: 'Android清理打包',
        command: 'cd android && ./gradlew clean',
      },
      {
        name: '应用打包',
        command: 'node ./scripts/build.js {package}',
        hasPackageSelect: true,
        transformPackage: (pkg) => pkg.split('.').pop()
      }
    ]
  },
  packages: {
    title: '包名列表',
    commands: Object.entries(appConfigs).map(([name, config]) => ({
      name: name,
      command: config.applicationID,
    }))
  }
}; 