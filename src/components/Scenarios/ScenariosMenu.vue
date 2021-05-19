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
              id="option-1"
              name="option-1"
              v-model="scenario.conditions.first.checked"
            />
            <label class="scenarios-menu-item__option mt4" for="option-1">
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
              id="option-2"
              name="option-2"
              v-model="scenario.conditions.second.checked"
            />
            <label class="scenarios-menu-item__option mt4" for="option-2">
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
              id="option-3"
              name="option-3"
              v-model="scenario.conditions.third.checked"
            />
            <label class="scenarios-menu-item__option mt6" for="option-3">
              <span>Пользователь ответил на вопрос</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ScenariosMenu",
  data() {
    return {
      hash: this.$route.params.hash,
      scenarios: {},
    };
  },
  components: {},
  methods: {
    getScenarios() {
      axios.get("scenarios/" + this.hash).then((res) => {
        this.scenarios = res.data.data;
        this.scenarios.forEach((scenario) => {
          scenario.conditions = {};
          this.$set(scenario.conditions, "first", {
            checked: false,
            scores: null,
            questionId: null,
          });
          this.$set(scenario.conditions, "second", {
            checked: false,
            scores: null,
            questionId: null,
          });
          this.$set(scenario.conditions, "third", {
            checked: false,
            scores: null,
            questionId: null,
          });
        });
      });
    },
    hideMenu() {
      this.$emit("hideMenu");
    },
    save() {
      axios.post('scenarios/conditions/save', {
        scenarios: this.scenarios,
      }).then((res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.getScenarios();
  },
};
</script>

<style lang="scss" scoped>
@import "@/common.blocks/form-checkbox_type-main.scss";
@import "@/common.blocks/form-slider_type-main.scss";
@import "@/common.blocks/scenarios-menu.scss";
</style>
