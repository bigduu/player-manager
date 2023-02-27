<template>
  <el-container>
    <el-header style="">
      <div style="padding: 15px;">
        xxxx播放管理系统
      </div>
    </el-header>
    <el-main style="">
      <el-botton style="float: left;">xxxx</el-botton>
      <el-divider />
      <el-empty v-if="nodeList.length === 0" />
      <el-row v-else :gutter="20" type="flex">
        <el-col style="height:100%" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="(source, index) in images"
          :key="index">
          <div class="grid-content">
            <ImagePanel :name="source.name" :ip="source.ip" @click="to_details(source.name, source.ip)" />
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import ImagePanel from './ImagePanel.vue'
import { getNodes } from '../client/api'
import { ClusterNode } from '../model'
import router from '../route/router'

export interface SingleNode {
  ip: string,
  name: string
}

const to_details = (name: string, ip: string) => {
  router.push({
    path: `/detail/${name}/${ip}`,
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
