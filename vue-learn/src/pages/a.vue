<template>
    <div>
        page A {{$store.state.count}}
        <button type='button' name='button' @click="increment">增加</button>
        <button type='button' name='button' @click="deletion">减少</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    methods:{
        ...mapActions([
            'increment','deletion'
        ])
    }
}
</script>
