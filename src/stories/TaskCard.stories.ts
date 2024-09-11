// TaskCard.stories.ts
import TaskCard from '@/components/tasks/TaskCard.component.vue';

export default {
    title: 'Components/TaskCard',
    component: TaskCard,
};

const Template = (args) => ({
    components: { TaskCard },
    setup() {
        return { args };
    },
    template: '<task-card v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    taskData: {
        title: 'Test Task 1',
        description: 'This is a test task',
        dueDate: '2023-12-31',
        status: 'pending',
        id: '1',
    },
};

export const Completed = Template.bind({});
Completed.args = {
    taskData: {
        title: 'Test Task 2',
        description: 'This is a test task',
        dueDate: '2023-12-31',
        status: 'completed',
        id: '2',
    },
};