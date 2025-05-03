import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'

class RoomObject {
  constructor(token, serverUrl) {
    this.token = token
    this.serverUrl = serverUrl
    this.socket = io(`${this.serverUrl}/session`, {
      autoConnect: false
    })
    this.connected = false

    this.events = {
      'new_message': [],
      'research_initiated': [],
      'research_finished': [],
      'research_step_finished': [],
      'title_suggested': [],
      'error': [],
      'token_count': []
    }

    // bind connect event
    this.socket.on('connect', () => {
      console.log('Connected to server')
      // initiate authentication
      if (!this.connected) {
        this.socket.emit('initiate', { session: this.token })
      }
      this.connected = true
    })

    // new message event
    this.socket.on('new_message', (data) => {
      this.events['new_message'].forEach(callback => callback(data))
    })
    // research initiated event
    this.socket.on('research_initiated', (data) => {
      this.events['research_initiated'].forEach(callback => callback(data))
    })
    // research finished event
    this.socket.on('research_finished', (data) => {
      this.events['research_finished'].forEach(callback => callback(data))
    })
    // research step finished event
    this.socket.on('research_step_finished', (data) => {
      this.events['research_step_finished'].forEach(callback => callback(data))
    })
    // title suggested event
    this.socket.on('title_suggested', (data) => {
      this.events['title_suggested'].forEach(callback => callback(data))
    })
    // error event
    this.socket.on('error', (data) => {
      this.events['error'].forEach(callback => callback(data))
    })
    // token count event
    this.socket.on('token_count', (data) => {
      console.log('Token count:', data)
      this.events['token_count'].forEach(callback => callback(data))
    })
  }

  on(event, callback) {
    if (this.events[event]) {
      this.events[event].push(callback)
    }
  }

  on_error(callback) {
    this.on('error', callback)
  }

  on_new_message(callback) {
    this.on('new_message', callback)
  }

  on_research_initiated(callback) {
    this.on('research_initiated', callback)
  }

  on_research_finished(callback) {
    this.on('research_finished', callback)
  }

  on_research_step_finished(callback) {
    this.on('research_step_finished', callback)
  }

  on_title_suggested(callback) {
    this.on('title_suggested', callback)
  }

  on_token_count(callback) {
    this.on('token_count', callback)
  }

  connect() {
    this.socket.connect()
  }

  disconnect() {
    this.socket.disconnect()
  }

  conduct() {
    this.socket.emit('conduct', {})
  }

  next_step() {
    this.socket.emit('next_step', {})
  }

  interact(message) {
    this.socket.emit('interact', message)
  }
}

export default RoomObject