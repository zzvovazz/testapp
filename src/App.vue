<template>
    <v-app>
        <v-content>
            <v-autocomplete v-model="model"
                            :items="items"
                            :loading="isLoading"
                            :search-input.sync="search"
                            color="white"
                            hide-no-data
                            hide-selected
                            item-text="Description"
                            item-value="API"
                            label="Select user"
                            placeholder="Start typing to Search"
                            prepend-icon="mdi-database-search"
                            return-object></v-autocomplete>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th v-for="item in Object.keys(dates[0] || [])">
                                {{item}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in dates" :key="row.date">
                            <td v-for="item in Object.keys(row || [])">
                                {{row[item]}}
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {
        },

        data: () => ({
            isLoading: false,
            search: null,
            model: null,
            entries: [],
            dates: [],
        }),

        created() {
            fetch('http://localhost:8081/dates')
                .then(res => res.json())
                .then(res => {
                    this.dates = res;
                })
                .catch(err => {
                    console.error(err);
                })
        },

        computed: {
            items() {
                return this.entries.map(entry => {
                    return entry.first_name + ' ' + entry.last_name;
                })
            },
        },

        watch: {
            search(val) {
                if (this.isLoading) return;
                this.isLoading = true;
                fetch('http://localhost:8081/users?s=' + encodeURIComponent(val))
                    .then(res => res.json())
                    .then(res => {
                        this.entries = res;
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    .finally(() => (this.isLoading = false));
            },
        },
    };
</script>
