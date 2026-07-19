---
sidebar_position: 0
sidebar_label: 首页
title: 花生FPV｜Betaflight 中文非官方 Wiki
description: 花生FPV 维护的 Betaflight 中文非官方 Wiki，提供固件刷写、配置、调参、硬件与黑匣子分析资料。
pagination_next: null
pagination_prev: null
---

import Link from '@docusaurus/Link'

# Betaflight 中文 Wiki

面向中文飞手的 Betaflight 实用文档。从刷写固件、首次配置到调参与故障排查，按实际任务快速找到可靠的操作说明。

<div className="wiki-index__tools wiki-index__tools--featured">
  <a href="https://bf.hs-fpv.com" target="_blank" rel="noopener noreferrer">
    <span className="wiki-index__tool-kicker">镜像加速</span>
    <strong>BF 地面站</strong>
    <span>国内镜像加速，无需安装，可直接连接飞控并在线刷写 Betaflight 固件。</span>
    <span className="wiki-index__tool-action">打开 BF 地面站</span>
  </a>
  <a href="https://bbe.hs-fpv.com" target="_blank" rel="noopener noreferrer">
    <span className="wiki-index__tool-kicker">在线工具</span>
    <strong>Blackbox Explorer</strong>
    <span>在线打开并分析飞行黑匣子日志，查看曲线与关键数据，辅助排查和调参。</span>
    <span className="wiki-index__tool-action">打开 Blackbox Explorer</span>
  </a>
</div>

<div className="wiki-index__actions">
  <Link className="button button--primary" to="/docs/wiki/getting-started">开始使用</Link>
  <Link className="button button--secondary" to="/docs/wiki/guides/current/FAQ">查找问题答案</Link>
</div>

## 从任务开始

<div className="wiki-index__grid wiki-index__grid--tasks">
  <Link className="wiki-index__card" to="/docs/wiki/getting-started/firmware-installation">
    <strong>安装固件</strong>
    <span>准备飞控并刷写正确的 Betaflight 固件版本。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/wiki/getting-started/setup-guide">
    <strong>完成首次配置</strong>
    <span>设置端口、接收机、电机、模式、OSD 和必要的安全检查。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/wiki/app">
    <strong>使用 Betaflight App</strong>
    <span>了解地面站页面、连接方式和日常配置流程。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/category/tuning-notes">
    <strong>调校飞行表现</strong>
    <span>理解 PID、滤波、预设和基于黑匣子的调校方法。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/wiki/getting-started/troubleshooting">
    <strong>排查问题</strong>
    <span>处理连接、接收机、解锁、电机和图传等常见故障。</span>
  </Link>
</div>

## 按主题浏览

<div className="wiki-index__grid wiki-index__grid--topics">
  <Link className="wiki-index__card" to="/docs/wiki/getting-started">
    <strong>入门</strong>
    <span>核心概念、固件安装、首次设置与故障排除。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/category/release-notes">
    <strong>发布说明</strong>
    <span>查看版本变化、兼容性说明和版本相关的使用建议。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/category/tuning-notes">
    <strong>调参说明</strong>
    <span>性能调校和滤波设置的参考资料。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/wiki/guides">
    <strong>指南</strong>
    <span>功能、硬件、协议和故障排查的深入说明。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/wiki/app">
    <strong>Betaflight App</strong>
    <span>桌面端与网页端地面站的使用文档。</span>
  </Link>
  <Link className="wiki-index__card" to="/docs/category/boards">
    <strong>飞控板资料</strong>
    <span>查找目标信息和特定飞控板的参考资料。</span>
  </Link>
</div>
