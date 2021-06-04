<template>
  <div class="main">
    <div class="scenarios-menu bg-white-shadow">
      <h3 class="scenarios-menu__h3 h3-default mb0">Управление сценариями</h3>
     <!--  <router-link 
        :to="'/test/scenario/add/' + this.hash"
        class="
          button 
          button-clasic
          button_theme-roboto_small 
          button_theme-purple 
          inline-block
          mt5
        "
      >
        Добавить сценарий
      </router-link> -->
      <div class="scenarios-menu__main">
        <div
          class="scenarios-menu-item"
          v-for="(scenario, index) in scenarios"
          :key="scenario.id"
        >
          <div class="scenarios-menu-item__header flex flex-align-center">
            <div class="inline-flex flex-align-center">
              <label class="slider">
                <input type="checkbox" class="none" />
                <span class="slider__circle slider__round"></span>
              </label>
              <span class="ml6">{{ scenario.name }}</span>
            </div>
            <div>
              <router-link :to="`/test/scenario/edit/${scenario.id}`" title="Редактировать">
                <img
                  style="vertical-align: bottom"
                  src="/Vectors/pen32.svg"
                  width="26px"
                />
              </router-link>
              <img
                class="ml4 pointer"
                style="vertical-align: bottom"
                src="/pictures/trash.svg"
                height="24px"
                @click="deleteScenario(scenario.id, index)"
              />
            </div>
          </div>
          <div class="scenarios-menu-item__options flex flex-vertical">
            <input
              class="custom-checkbox"
              type="checkbox"
              :id="'option-1' + scenario.id"
              name="option-1"
              v-model="scenario.conditions.first.checked"
            />
            <label class="scenarios-menu-item__option mt4" :for="'option-1' + scenario.id">
              <span>Пользователь набрал больше </span
              ><input
                class="scenarios-menu-item__input ml5 mr5"
                v-model.number="scenario.conditions.first.scores"
                type="text"
              /><span>баллов</span>
            </label>

            <input
              class="custom-checkbox"
              type="checkbox"
              :id="'option-2' + scenario.id"
              name="option-2"
              v-model="scenario.conditions.second.checked"
            />
            <label class="scenarios-menu-item__option mt4" :for="'option-2' + scenario.id">
              <span>Пользователь набрал меньше </span
              ><input
                class="scenarios-menu-item__input ml5 mr5"
                v-model.number="scenario.conditions.second.scores"
                type="text"
              /><span>баллов</span>
            </label>

            <input
              class="custom-checkbox"
              type="checkbox"
              :id="'option-3' + scenario.id"
              name="option-3"
              v-model="scenario.conditions.third.checked"
            />
            <label class="scenarios-menu-item__option mt6" :for="'option-3' + scenario.id">
              <span>Пользователь ответил на вопрос</span>
            </label>
            <multiselect
                v-model="scenario.conditions.third.question"
                :options="options"
                label="question"
                placeholder="Выберите вопрос"
                class="mt5 mb5"
                :multiple="false"
                selectLabel=""
                selectedLabel=""
                deselectLabel=""
              ></multiselect>
            <div>
              <button
               class="button button-clasic button_theme-roboto button_theme-purple" 
               @click="save(scenario)"
              >
               Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  name: "ScenariosMenu",
  data() {
    return {
      hash: this.$route.params.hash,
      scenarios: [],
      options: [],
    };
  },
  components: {
    Multiselect
  },
  methods: {
    getScenarios() {
      axios.get("scenarios/" + this.hash).then((res) => {
        this.scenarios = res.data.data;
        this.scenarios.forEach((scenario) => {
          let conditions = scenario.conditions;
          scenario.conditions = {};
          this.$set(scenario.conditions, "first", {
            condition: 'BT',
            checked: false,
            scores: null,
            question: {
              name: null,
              id: null,
            },
          });
          this.$set(scenario.conditions, "second", {
            condition: 'LT',
            checked: false,
            scores: null,
            question: {
              name: null,
              id: null,
            },
          });
          this.$set(scenario.conditions, "third", {
            condition: 'QE',
            checked: false,
            scores: null,
            question: {
              name: null,
              id: null,
            },
          });

          conditions.forEach((condition) => {
            if(condition.condition == 'BT') {
              scenario.conditions.first.checked = true
              scenario.conditions.first.scores = condition.scores
            }
            if(condition.condition == 'LT') {
              scenario.conditions.second.checked = true
              scenario.conditions.second.scores = condition.scores
            }
            if(condition.condition == 'QE') {
              scenario.conditions.third.checked = true
              console.log(condition)
              scenario.conditions.third.question.id = condition.question_id
              scenario.conditions.third.question.question = condition.question_name
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
    getRangesList() {
      let rangesList = []
      this.scenarios.forEach((scenario) => {
        let conditions = scenario.conditions
        if (conditions.first.checked && conditions.second.checked) {
          if (conditions.second.scores-1 < conditions.first.scores+1) {
            rangesList.push([0, conditions.second.scores-1], [conditions.first.scores+1, 100000])
          }
          else {
            rangesList.push([conditions.first.scores+1, conditions.second.scores-1])
          }
        }
        else if(conditions.first.checked) {
          rangesList.push([conditions.first.scores+1, 100000])
        }
        else if(conditions.second.checked) {
          rangesList.push([0, conditions.second.scores-1])
        }
      })
      return rangesList;
    },
    checkedConditions() {
      let rangesList = this.getRangesList()
      if(!this.getExtremus(rangesList)) {
        alert('Пересечение')
        return false
      }
      for (let i = 0; i < rangesList.length; i++) {
        for (let j = 0; j < rangesList.length; j++) {
          if (j === i) continue;
          if (
            (rangesList[i][0] >= rangesList[j][0] && rangesList[i][0] <= rangesList[j][1])
            || (rangesList[i][1] >= rangesList[j][0] && rangesList[i][1] <= rangesList[j][1])
          ) {
            alert('пересечение')
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
          
        })
      }
    },
    deleteScenario(id, index) {
      axios.delete('scenario/delete/' + id).then(() => {
        this.$delete(this.scenarios, index)
      })
    }
  },
  mounted() {
    this.getScenarios();
    this.getQuestions()
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-slider_type-main.scss";
@import "@/common.blocks/scenarios-menu.scss";
</style>
