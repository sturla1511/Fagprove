<script setup>
const assetTypes = ["PC", "Mac", "Mobile", "Mouse", "Keyboard", "Headset" ]
</script>

<template>
  <div class="menu-container">
    <div class="menu">
      <span>Inventory</span>
      <nav>
        <ul>
          <li>
            <nuxt-link to="/assets">
              Assets
            </nuxt-link>
            <ul>
              <li v-for="(type, index) in assetTypes" :key="index">
                <nuxt-link :to="'/assets/'+type?.toLowerCase()">
                  {{ type }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <nuxt-link to="/employees">
              Employees
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <img class="gps-logo" src="/svg/gs-logo.svg" alt="glasspaper solutions logo">
    </div>
    <img
      aria-hidden="true"
      class="wave-vertical" 
      src="/svg/wave-vertical.svg" 
      alt="vertical wave"
    >
    <img 
      aria-hidden="true"
      class="wave-horizontal" 
      src="/svg/wave-horizontal.svg" 
      alt="horizontal wave"
    >
  </div>
</template>

<style scoped lang="scss">
.menu-container {
  display: flex;
  flex-flow: column;
  height: 70px;
  width: 100%;
  .menu {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: $gray-700;
    color: white;
    overflow: auto;
    span {
      display: none;
      padding: 12px 16px;
      font-size: 24px;
      font-weight: bold;
    }
    nav {
      margin-left: auto;
      display: flex;
      padding: 16px;
      gap: 8px;
      ul {
        display: flex;
        padding: 0;
        list-style-type: none;
        margin: 0;
        gap: 8px;
        li {
          ul li {
            a, nuxt-link {
              display: none;
            }
          }
        }
      }
      a, nuxt-link {
        font-size: 18px;
        cursor: pointer;
        color: white;
        text-decoration-line: none;
        &:hover {
          text-decoration-line: underline;
        }
        &.router-link-active, &.router-link-exact-active {
          color: #79F1F8;
        }
      }
    }
    .gps-logo {
      order: -1;
      padding-top: 6px;
      padding-left: 12px;
      width: 26px;
    }
  }
  .wave-vertical {
    display: none;
  }
  .wave-horizontal {
    display: flex;
    background-color: $white;
    width: 100%;
    
  }
}
@media (min-width: $breakpoint-sm) {
  .menu-container {
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    height: 85px;
    .menu {
      height: 65px;
      span {
        display: flex;
      }
      .gps-logo {
        width: 32px;
      }
    }
  }
}
@media (min-width: $breakpoint-md) {
  .menu-container {
    justify-content: flex-start;
    flex-flow: row;
    height: 100%;
    width: 186px;
    border-radius: 16px;
    .menu {
      flex-flow: column;
      height: 100%;
      width: 100%;
      span {
        padding: 16px 10px 0 20px;
      }
      nav {
        flex-flow: column;
        margin-left: 0;
        margin-bottom: auto;
        padding: 20px;
        a, nuxt-link {
          font-size: 22px;
        }
        ul {
          display: flex;
          margin: 0;
          flex-flow: column;
          gap: 12px;
          li {
            ul {
              padding-left: 12px;
              padding-top: 4px;
              border-left: 2px solid white;
              gap: 8px;
              li {
                a, nuxt-link {
                  display: flex;
                  font-size: 18px;
                }
              }
            }
          }
        }
      }
      .gps-logo {
        width: 32px;
        order: 0;
        padding: 20px;
      }
    }
    .wave-vertical {
      display: flex;
    }
    .wave-horizontal {
      display: none;
    }
  }
}

</style>