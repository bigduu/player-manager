<script lang="ts" setup>
import {VideoPlay, VideoPause, Edit} from '@element-plus/icons-vue';
import {ElCard, ElRow, ElCol, ElDivider, ElAlert, ElButton, ElIcon, ElMessageBox, ElMessage} from 'element-plus';
import {onMounted, onUnmounted, ref} from 'vue';
import {getScreen, pauseVideo, playVideo, putNodeName} from '../client/api';
import router from '../route/router';

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

defineExpose({
  play,
  pause,
})

const to_details = (name: string, ip: string) => {
  router.push({
    path: `/detail/${name}/${ip}`,
  })
}

const open = () => {
  ElMessageBox.prompt('请输入要修改的名字', '改名', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
      .then(({value}) => {
        putNodeName(props.ip, value)
            .then((res: any) => {
              ElMessage({
                type: 'success',
                message: `修改成功`,
              })
            })
            .catch((_: any) => {
              ElMessage({
                type: 'error',
                message: `修改失败`,
              })
            })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消修改',
        })
      })
}
</script>
<template>
  <div v-cloak>
    <el-card>
      <div @click="to_details(name, ip)">
        <el-row type="flex">
          <el-col class="video-name">
            <span>{{ name }}</span>
            <el-divider/>
          </el-col>
          <el-col>
            <img v-if="!hasError" style="width: 100%;height: 10vh;" :src="src" :key="src"/>
            <el-alert style="width: 100%;height: 10vh;" v-else title="获取预览失败" type="error"/>
          </el-col>
        </el-row>
      </div>
      <el-divider/>

      <el-button class="inline-block" type="primary" @click="play">
        <el-icon>
          <VideoPlay/>
        </el-icon>
        播放
      </el-button>
      <el-button class="inline-block" type="primary" @click="pause">
        <el-icon>
          <VideoPause/>
        </el-icon>
        暂停
      </el-button>
      <!--     pup a dialog to put put the node name -->
      <el-button class="inline-block" type="primary" @click="open">
        <el-icon>
          <Edit/>
        </el-icon>
        改名</el-button>

    </el-card>
  </div>
</template>

<style scoped>
.inline-block {
  display: inline-block;
}
</style>
