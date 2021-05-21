<template>
  <div class="main">
    <div class="scenarios-menu bg-white-shadow">
      <h3 class="scenarios-menu__h3 h3-default">Управление сценариями</h3>
      <button @click="save">Сохранить</button>
      <div class="scenarios-menu__main">
        <div
          class="scenarios-menu-item"
          v-for="scenario in scenarios"
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
              <router-link :to="`/test/edit/${hash}`" title="Редактировать">
                <img
                  style="vertical-align: bottom"
                  src="/Vectors/pen32.svg"
                  width="26px"
                />
              </router-link>
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
                v-model="scenario.question"
                :options="options"
                label="question"
                :placeholder="'Выберите вопрос'"
                class="mt5 mb5"
                :multiple="false"
                selectLabel=""
                selectedLabel=""
                deselectLabel=""
              ></multiselect>
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
            questionId: null,
          });
          this.$set(scenario.conditions, "second", {
            condition: 'LT',
            checked: false,
            scores: null,
            questionId: null,
          });
          this.$set(scenario.conditions, "third", {
            condition: 'QE',
            checked: false,
            scores: null,
            questionId: null,
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
              scenario.conditions.third.questionId = condition.question_id
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
    save() {
      this.scenarios.forEach((scenario) => {
        if(scenario.conditions.third.questionId != null && scenario.question) {
          scenario.conditions.third.questionId = scenario.question.id
        }
      })
      axios.post('scenarios/conditions/save', {
        scenarios: this.scenarios,
      }).then((res) => {
        console.log(res)
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
