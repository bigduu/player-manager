<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { getScreen, pauseVideo, playVideo } from '../client/api';
const props = defineProps<{ name: string, ip: string }>()

const src = ref('')
const hasError = ref(false)
const interval = ref(0)

onMounted(async () => {
  getSrc()
  interval.value = setInterval(async () => {
    getSrc()
  }, 10000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

const getSrc = () => {
  getScreen(props.ip)
    .then((res: string) => {
      src.value = res
      hasError.value = false
    })
    .catch((_: any) => {
      if (src.value !== '') {
        hasError.value = true
      }
    })
}

const play = async () => {
  await playVideo(props.ip)
}

const pause = async () => {
  await pauseVideo(props.ip)
}


</script>

<template>
  <div v-cloak>
    <el-card>
      <el-row type="flex">
        <el-col class="video-name">
          <span>{{ name }}</span>
          <el-divider />
        </el-col>
        <el-col>
          <img v-if="!hasError" style="width: 100%;height: 10vh;" :src="src" :key="src" />
          <el-alert style="width: 100%;height: 10vh;" v-else title="获取预览失败" type="error" />
        </el-col>
      </el-row>
      <el-divider />

      <el-button class="inline-block" type="primary" @click="play" size="small">
        <el-icon>
          <VideoPlay />
        </el-icon>
        播放</el-button>
      <el-button class="inline-block" type="primary" @click="pause" size="small">
        <el-icon>
          <VideoPause />
        </el-icon>
        暂停
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.inline-block {
  display: inline-block;
}

.no-wrap {
  display: flex;
  flex-wrap: nowrap;
}
</style>
