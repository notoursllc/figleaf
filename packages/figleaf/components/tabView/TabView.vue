<script>
// This component was copied from: https://github.com/primefaces/primevue/blob/86360a6df10a8022fecfbf6e7445d0f8b11d8521/src/components/tabview/TabView.vue

import DomHandler from '../../utils/dom.js';
import VNodes from '../vNodes/VNodes.vue';
import FigIcon from '../icon/FigIcon.vue';


const TabPanelHeaderSlot = {
    functional: true,
    props: {
        tab: {
            type: null,
            default: null
        }
    },
    render(createElement, context) {
        return [context.props.tab.$scopedSlots['header']()];
    }
};

export default {
    data() {
        return {
            d_children: []
        };
    },

    mounted() {
        this.d_children = this.$children;
    },

    updated() {
        let activeTab = this.tabs[this.findActiveTabIndex()];
        if (!activeTab && this.tabs.length) {
            this.tabs[0].d_active = true;
        }
        this.updateInkBar();
    },

    methods: {
        onTabClick(event, tab) {
            if (!tab.disabled && !tab.d_active) {
                this.activateTab(tab);
                this.$emit('tab-change', {
                    originalEvent: event,
                    tab: tab
                });
            }
        },

        activateTab(tab) {
            for (let i = 0; i < this.tabs.length; i++) {
                let active = this.tabs[i] === tab;
                this.tabs[i].d_active = active;
                this.tabs[i].$emit('update:active', active);
            }
            this.updateInkBar();
        },

        onTabKeydown(event, tab) {
            if (event.which === 13) {
                this.onTabClick(event, tab);
            }
        },

        findActiveTabIndex() {
            for (let i = 0; i < this.tabs.length; i++) {
                let tab = this.tabs[i];
                if (tab.d_active) {
                    return i;
                }
            }
            return null;
        },

        updateInkBar() {
            let tabHeader = this.$refs.nav.children[this.findActiveTabIndex()];
            this.$refs.inkbar.style.width = DomHandler.getWidth(tabHeader) + 'px';
            this.$refs.inkbar.style.left =  DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.$refs.nav).left + 'px';
        }
    },

    computed: {
        tabs() {
            return this.d_children.filter(child => child.$vnode.tag.indexOf('tabpanel') !== -1);
        }
    },

    components: {
        'TabPanelHeaderSlot': TabPanelHeaderSlot
    }
}
</script>


<template>
    <div class="p-tabview p-component">
        <ul ref="nav" class="p-tabview-nav" role="tablist">
            <li role="presentation" v-for="(tab, i) of tabs" :key="tab.header || i" :class="[{'p-highlight': (tab.d_active), 'p-disabled': tab.disabled}]">
                <a role="tab" class="p-tabview-nav-link" @click="onTabClick($event, tab)" @keydown="onTabKeydown($event, tab)" :tabindex="tab.disabled ? null : '0'" :aria-selected="tab.d_active">
                    <span class="p-tabview-title" v-if="tab.header">{{tab.header}}</span>
                    <TabPanelHeaderSlot :tab="tab" v-if="tab.$scopedSlots.header" />
                </a>
            </li>
            <li ref="inkbar" class="p-tabview-ink-bar"></li>
        </ul>
        <div class="p-tabview-panels">
            <slot></slot>
        </div>
    </div>
</template>



<style>
.p-tabview-nav-container {
    position: relative;
}
.p-tabview-scrollable .p-tabview-nav-container {
    overflow: hidden;
}
.p-tabview-nav-content {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}
.p-tabview-nav {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex: 1 1 auto;
}
.p-tabview-nav-link {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    overflow: hidden;
}
.p-tabview-ink-bar {
    display: none;
    z-index: 1;
}
.p-tabview-nav-link:focus {
    z-index: 1;
}
.p-tabview-title {
    line-height: 1;
    white-space: nowrap;
}
.p-tabview-nav-btn {
    position: absolute;
    top: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.p-tabview-nav-prev {
    left: 0;
}
.p-tabview-nav-next {
    right: 0;
}
.p-tabview-nav-content::-webkit-scrollbar {
    display: none;
}

.p-tabview .p-tabview-nav {
  background: #ffffff;
  /* border: 1px solid #dee2e6; */
  border-width: 0 0 2px 0;
}
.p-tabview .p-tabview-nav li {
  margin-right: 0;
  margin-bottom: 0;
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  border: solid #dee2e6;
  border-width: 0 0 2px 0;
  border-color: transparent transparent #dee2e6 transparent;
  background: #ffffff;
  color: #6c757d;
  padding: 1rem;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  transition: box-shadow 0.2s;
  margin: 0 0 -2px 0;
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.2rem #a6d5fa;
}
.p-tabview .p-tabview-nav li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link {
  background: #ffffff;
  border-color: #6c757d;
  color: #6c757d;
}
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: #2196F3;
  color: #2196F3;
}
.p-tabview .p-tabview-nav-btn.p-link {
  background: #ffffff;
  color: #2196F3;
  width: 2.357rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 0;
}
.p-tabview .p-tabview-nav-btn.p-link:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.2rem #a6d5fa;
}
.p-tabview .p-tabview-panels {
  background: #ffffff;
  padding: 1rem;
  border: 0 none;
  color: #495057;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
</style>
