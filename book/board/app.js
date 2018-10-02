const SERVER_DOMAIN = 'http://localhost:3000';
const SERVER_URL = SERVER_DOMAIN + '/data';

Vue.component('story', {
    template: '#template-story-raw',
    props: ['story'],
    methods: {
        deleteStory: function (story) {
            var index = this.$parent.stories.indexOf(story)
            this.$parent.stories.splice(index, 1)
            this.$http.delete(SERVER_URL + '/' + story.id)
        },
        upvoteStory: function (story) {
            story.upvotes++;
            this.$http.patch(SERVER_URL + '/' + story.id, story)
        },
        editStory: function (story) {
            story.editing = true;
        },
        updateStory: function (story) {
            this.$http.patch(SERVER_URL + '/' + story.id, story)
            //Set editing to false to show actions again and hide the inputs
            story.editing = false;
        },
        storeStory: function (story) {
            this.$http.post(SERVER_URL, story).then(function (response) {
                vm.fetchStories();
                //Set editing to false to show actions again and hide the inputs
                story.editing = false;
            });
        },
    }
})

var vm = new Vue({
    el: '#v-app',
    data: {
        stories: [],
        pagination: {},
        story: {}
    },
    mounted: function () {
        this.fetchStories()
    },
    methods: {
        createStory: function () {
            var newStory = {
                plot: "",
                upvotes: 0,
                editing: true
            };
            this.stories.push(newStory);
        },
        fetchStories: function (page_url) {
            var vm = this;
            page_url = page_url || SERVER_URL

            console.log('1 > page_url = '+page_url);
            if (!page_url.includes('http://')) {
              page_url = SERVER_DOMAIN + page_url;
            }
            console.log('2 > page_url = '+page_url);

            this.$http.get(page_url).then(function (response) {
                console.log('data.length = ' + response.data.data.length);
                var storiesReady = response.data.data.map(function (story) {
                    story.editing = false;
                    return story
                })
                vm.makePagination(response.data)

                this.stories = storiesReady
            });
        },
        makePagination(data){
            //here we use response.data
            var pagination = {
                current_page: data.current_page,
                last_page: data.last_page,
                next_page_url: data.next_page_url,
                prev_page_url: data.prev_page_url
            }
            this.pagination = pagination
        }
    }
});