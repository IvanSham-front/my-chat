<script setup>

import ChatList from '@/components/chat/chats/ChatList/ChatList.vue';
import ChatLogo from '@/assets/images/ChatLogo.vue';
import PlusIcon from '@/assets/images/PlusIcon.vue';
import FilterIcon from '@/assets/images/FilterIcon.vue';

</script>

<template>
  <section class="sidebar">
    <header class="sidebar__header">
      <div class="sidebar__project-info project-info">
        <div class="sidebar__logo">
          <ChatLogo />
        </div>
        <div class="project-info__desc">
          <h2 class="sidebar__title">MyChat</h2>
          <span class="project-info__version">v-0.1 beta</span>
        </div>
      </div>

      <div class="sidebar__actions">
        <button class="sidebar__action-button">
          <PlusIcon />
        </button>

        <button class="sidebar__action-button">
          <FilterIcon />
        </button>
      </div>
    </header>

    <ChatList class="sidebar__chat-list"></ChatList>
  </section>
</template>

<style lang="scss" scoped>
@import './SidebarElement.scss';
</style>