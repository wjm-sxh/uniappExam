# uniappExam

项目介绍

该仓库是一个基于 Uniapp 框架开发的在线考试系统项目，名为uniappExam，即 “掌上考试”。此系统具备用户注册、登录、设置密码、获取考试分类和试卷信息、参加考试以及查看成绩等功能，支持多平台（如安卓、iOS）使用。

    前端框架：使用 Uniapp 框架进行开发，该框架可以将代码编译到多个平台，如小程序、H5、APP 等，实现了一次开发多端部署，提高了开发效率。
    编程语言：主要使用 Vue.js 进行开发，项目中采用了 Vue 3 的版本，利用其响应式原理和组件化开发的特性构建用户界面。
    网络请求：封装了uni.request方法，实现了 GET 和 POST 请求，方便与后端进行数据交互。
    样式处理：使用 SCSS 作为 CSS 预处理器，在uni.scss文件中可以定义全局样式，方便管理和复用样式代码。
    存储管理：使用uni.setStorageSync和uni.getStorageSync方法进行本地数据存储，用于保存用户的 token 和昵称等信息。

核心成果

    多平台适配：通过 Uniapp 框架，项目可以在安卓、iOS 等多个平台上运行，扩大了系统的使用范围。
    用户功能完善：实现了用户注册、登录、设置密码、获取个人信息等功能，为用户提供了完整的身份认证和信息管理体验。
    考试功能齐全：包含考试分类展示、试卷列表展示、试卷详情查看、题目获取、考试成绩记录和查询等功能，满足了在线考试的基本需求。
    界面设计合理：通过 CSS 样式文件对各个页面进行了样式设计，保证了界面的美观和易用性。

技术难点

    多平台兼容性：由于 Uniapp 需要将代码编译到多个平台，不同平台的特性和限制不同，可能会出现兼容性问题，需要进行大量的测试和调试工作。
    网络请求封装：为了方便与后端进行数据交互，需要对uni.request方法进行封装，同时要处理好请求的成功和失败情况，保证数据的准确性和稳定性。
    数据存储与管理：在本地存储用户信息和考试成绩等数据时，需要考虑数据的安全性和一致性，避免出现数据丢失或错乱的情况。
    性能优化：在处理大量数据（如试卷题目列表）时，需要考虑性能优化，避免出现页面卡顿或加载缓慢的问题。可以采用分页加载、缓存等技术来提高性能。

