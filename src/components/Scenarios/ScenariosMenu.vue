<template>
  <div class="main">
    <div class="scenarios-menu bg-white-border" v-if="showContent">
      <h3 class="scenarios-menu__h3 h3-default flex flex-justify-between mb0">
        Управление сценариями
        <router-link 
          :to="'/test/scenario/add/' + this.hash"
          class="scenarios-menu__add-scenario"
        >
          Добавить сценарий +
        </router-link>
      </h3>
      <div class="scenarios-menu__main">
        <div class="scenarios-menu__empty flex flex-center" v-if="scenarios.length === 0">
          У вас пока нет сценариев
        </div>
        <div
          class="scenarios-menu-item"
          v-for="(scenario, index) in scenarios"
          :key="scenario.id"
        >
          <div class="scenarios-menu-item__header flex flex-align-center">
            <div class="inline-flex flex-align-center">
              <ListSVG />
              <span class="ml4">{{ scenario.name }}</span>
            </div>
            <div>
              <router-link :to="`/test/scenario/edit/${scenario.id}`" title="Редактировать">
                <img
                  style="vertical-align: bottom"
                  src="/Vectors/pen32_white.svg"
                  width="26px"
                />
              </router-link>
              <img
                class="ml5 pointer"
                style="vertical-align: bottom"
                src="/pictures/trash_white.svg"
                height="24px"
                @click="showDeleteModal(scenario.id, index)"
              />
            </div>
          </div>
          <div class="scenarios-menu-item__options flex flex-vertical">
            <div class="flex flex-align-center mt4">
              <input
                class="custom-checkbox"
                type="checkbox"
                :id="'option-1' + scenario.id"
                name="option-1"
                v-model="scenario.conditions.first.checked"
              />
              <label :for="'option-1' + scenario.id"></label>
              <span class="scenarios-menu-item__option">
                <span>Пользователь набрал </span>
                <input
                  class="scenarios-menu-item__input ml5 mr5"
                  v-model.number="scenario.conditions.first.scores"
                  type="text"
                /><span>баллов</span>
              </span>
            </div>

            <div class="flex flex-align-center mt4">
              <input
                class="custom-checkbox"
                type="checkbox"
                :id="'option-2' + scenario.id"
                name="option-2"
                v-model="scenario.conditions.second.checked"
              />
              <label :for="'option-2' + scenario.id"></label>
              <span class="scenarios-menu-item__option" :for="'option-2' + scenario.id">
                <span>Пользователь набрал больше </span
                ><input
                  class="scenarios-menu-item__input ml5 mr5"
                  v-model.number="scenario.conditions.second.scores"
                  type="text"
                /><span>баллов</span>
              </span>
            </div>

            <div class="flex flex-align-center mt4">
              <input
                class="custom-checkbox"
                type="checkbox"
                :id="'option-3' + scenario.id"
                name="option-3"
                v-model="scenario.conditions.third.checked"
              />
              <label :for="'option-3' + scenario.id"></label>
              <span class="scenarios-menu-item__option" :for="'option-3' + scenario.id">
                <span>Пользователь набрал меньше </span
                ><input
                  class="scenarios-menu-item__input ml5 mr5"
                  v-model.number="scenario.conditions.third.scores"
                  type="text"
                /><span>баллов</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteModal 
      v-if="activeDeleteModal"
      message="Вы действительно хотите удалить сценарий?" 
      redMessage="Удалить" 
      blueMessage="Отмена"
      @action="deleteScenario($event)"
    />
    <MakeFooter type="scenario" @save="save" />
    <SuccessModal
      message="Успешно сохранено"
      v-if="showSuccess"
      type="test"
      :justSave="true"
      @go="$router.push('/test/edit/' + hash)"
    />
    <InfoModal :message="infoMessage" />
  </div>
</template>

<script>
import axios from "axios";
import MakeFooter from "@/components/MakeFooter.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import InfoModal from "@/components/InfoModal.vue";
import ListSVG from '/public/Vectors/list32-white.svg'

export default {
  name: "ScenariosMenu",
  data() {
    return {
      hash: this.$route.params.hash,
      scenarios: [],
      options: [],
      showSuccess: false,
      activeDeleteModal: false,
      fingerprint: window.VISITOR_ID,
      showContent: false,
      tempDelete: {
        id: null,
        key: null
      },
      infoMessage: {},
    };
  },
  components: {
    MakeFooter, SuccessModal,
    DeleteModal, InfoModal, ListSVG
  },
  methods: {
    getScenarios() {
      axios.get("scenarios/" + this.hash).then((res) => {
        this.scenarios = res.data.data;
        this.scenarios.forEach((scenario) => {
          let conditions = scenario.conditions;
          scenario.conditions = {};
          this.$set(scenario.conditions, "first", {
            condition: 'EQ',
            checked: false,
            scores: null,
            question: {
              name: null,
              id: null,
            },
          });
          this.$set(scenario.conditions, "second", {
            condition: 'BT',
            checked: false,
            scores: null,
            question: {
              name: null,
              id: null,
            },
          });
          this.$set(scenario.conditions, "third", {
            condition: 'LT',
            checked: false,
            scores: null,
            question: {
              name: null,
              id: null,
            },
          });

          conditions.forEach((condition) => {
            if(condition.condition == 'EQ') {
              scenario.conditions.first.checked = true
              scenario.conditions.first.scores = condition.scores
            }
            if(condition.condition == 'BT') {
              scenario.conditions.second.checked = true
              scenario.conditions.second.scores = condition.scores
            }
            if(condition.condition == 'LT') {
              scenario.conditions.third.checked = true
              scenario.conditions.third.scores = condition.scores
            }
          })
        });

      });
    },
    getQuestions() {
      axios.get('test/questions/getByHash/' + this.hash).then(res => {
        res = res.data.data
        this.options = res;
      })
    },
    hideMenu() {
      this.$emit("hideMenu");
    },
    showDeleteModal(id, key) {
      this.tempDelete.id = id
      this.tempDelete.key = key
      this.activeDeleteModal = true
    },
    deleteScenario(value) {
      if(value === 1) {
        axios.delete('scenario/delete/' + this.tempDelete.id).then(() => {
          this.$delete(this.scenarios, this.tempDelete.key)
        })
      }
      this.activeDeleteModal = false
    },
    /* disableException(scenario, typeCondition) {
      if (
        (scenario.conditions.first.checked
        || scenario.conditions.second.checked)
        && typeCondition == 'third'
      ) {
        return true;
      }
      else if (
        scenario.conditions.third.checked
        && (typeCondition == 'first' || typeCondition == 'second') 
      ) {
        return true;
      }
      return false;
    }, */
    getExtremus(rangesList) {
      let min = 0;
      let max = 0;
      rangesList.forEach((range) => {
        if(range[0] == 0) min++
        if(range[1] == 100000) max++
      })
      if(min > 1 || max > 1) return false
      else return true
    },
    checkEmptyConditions() {
      let stopBecauseEmpty = false
      this.scenarios.forEach((scenario) => {
        let conditions = scenario.conditions
        
        if(conditions.first.checked && !Number.isInteger(conditions.first.scores)) {
          stopBecauseEmpty = true
        }
        if(conditions.second.checked && !Number.isInteger(conditions.second.scores)) {
          stopBecauseEmpty = true
        }
        if(conditions.third.checked && !Number.isInteger(conditions.third.scores)) {
          stopBecauseEmpty = true
        }
      })
      return stopBecauseEmpty
    },
    getRangesList() {
      let rangesList = []
      this.scenarios.forEach((scenario) => {
        let conditions = scenario.conditions
        if(conditions.first.checked) {
          rangesList.push([conditions.first.scores, conditions.first.scores, scenario.id])
        }
        if (conditions.second.checked && conditions.third.checked) {
          if (conditions.third.scores-1 < conditions.second.scores+1) {
            rangesList.push([0, conditions.third.scores-1, scenario.id], [conditions.second.scores+1, 100000, scenario.id])
          }
          else {
            rangesList.push([conditions.second.scores+1, conditions.third.scores-1, scenario.id])
          }
        }
        else if(conditions.second.checked) {
          rangesList.push([conditions.second.scores+1, 100000, scenario.id])
        }
        else if(conditions.third.checked) {
          rangesList.push([0, conditions.third.scores-1, scenario.id])
        }
      })
      return rangesList;
    },
    checkedConditions() {
      let rangesList = this.getRangesList()
      if(this.checkEmptyConditions()) {
        this.infoMessage = {body: 'Вы не ввели количество баллов', type: 'danger'}
        return false;
      }
      if(!this.getExtremus(rangesList)) {
        this.infoMessage = {body: 'Пересечение с другими сценариями', type: 'danger'}
        return false
      }
      for (let i = 0; i < rangesList.length; i++) {
        for (let j = 0; j < rangesList.length; j++) {
          if (j === i) continue;
          if (
            (rangesList[i][0] >= rangesList[j][0] && rangesList[i][0] <= rangesList[j][1] && rangesList[i][2] !== rangesList[j][2])
            || (rangesList[i][1] >= rangesList[j][0] && rangesList[i][1] <= rangesList[j][1] && rangesList[i][2] !== rangesList[i][2])
          ) {
            this.infoMessage = {body: 'Пересечение с другими сценариями', type: 'danger'}
            return false
          }
        }
      }
      return true;
    },
    save() {
      if(this.checkedConditions()) {
        axios.post('scenarios/conditions/save', {
          scenarios: this.scenarios,
        }).then(() => {
          this.showSuccess = true
        })
      }
    },
  },
  beforeMount() {
    this.$store.commit('SHOW_LOADER')
    axios.post('/scenarios/check/access/', {
      fingerprint: this.fingerprint,
      hash: this.$route.params.hash,

    }).then((res) => {
      if(res.status === 200) {
        this.getScenarios();
        this.getQuestions()
        this.showContent = true
        this.$store.commit('HIDE_LOADER')
      }
      else {
        this.$router.push({name: 'List'})
      }
    }).catch(() => {
      this.$router.push({name: 'List'})
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-slider_type-main.scss";
@import "@/common.blocks/scenarios-menu.scss";
</style>
