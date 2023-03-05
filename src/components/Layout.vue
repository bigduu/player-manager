<template>
  <el-container>
    <el-header>
      <div style="padding: 15px;">
        播放管理系统
      </div>
    </el-header>
    <el-main>
      <el-button type="primary" style="margin-bottom: 20px;" @click="allPlay">全部播放</el-button>
      <el-button type="primary" style="margin-bottom: 20px;" @click="allPause">全部暂停</el-button>
      <el-divider/>
      <el-empty v-if="nodeList.length === 0"/>
      <el-row v-else :gutter="20" type="flex">
        <el-col style="height:100%" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(source, index) in images"
                :key="index">
          <div class="grid-content">
            <ImagePanel :ref="(el)=> setItemRefs(el,source.ip)" :name="source.name" :ip="source.ip"/>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {ComponentPublicInstance, HTMLAttributes, onMounted, ref, watch} from 'vue'
import ImagePanel from './ImagePanel.vue'
import {getNodes} from '../client/api'
import {ClusterNode} from '../model'

export interface SingleNode {
  ip: string,
  name: string
}

const itemRefs = ref<any[]>([]);
const setItemRefs = (el: HTMLElement | ComponentPublicInstance | HTMLAttributes, item: string) => {
  if (el) {
    // if the element is already in the array, don't add it again
    if (itemRefs.value.find((ref) => ref.id === item)) {
      return;
    }
    itemRefs.value.push({
      id: item,
      el,
    });
  }
}

const allPlay = () => {
  itemRefs.value.forEach((item) => {
    item.el.play()
  })
}

const allPause = () => {
  itemRefs.value.forEach((item) => {
    item.el.pause()
  })
}

const nodeList = ref<ClusterNode[]>([])

onMounted(async () => {
  fetchNodes()
  setInterval(async () => {
    fetchNodes()
  }, 8000)
})

const images = ref<SingleNode[]>([])

const fetchNodes = () => {
  getNodes()
      .then((res: ClusterNode[]) => {
        nodeList.value = res
      })
      .catch((_: any) => {
        nodeList.value = []
      })
}

watch(nodeList, (newVal: ClusterNode[], _: ClusterNode[]) => {
  const imagesIpList = newVal.map((node: ClusterNode) => {
    return {
      ip: node.ipaddress,
      name: node.name
    }
  })
  images.value = imagesIpList;
})

</script>

<style scoped>
.el-container {
  height: 100%;
  text-align: center;
}

.grid-content {
  padding: 20px;
  text-align: center;
}
</style>
