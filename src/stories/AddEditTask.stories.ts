// AddEditTask.stories.ts
import AddEditTask from '@/components/modals/AddEditTask.modal.vue';
import {TaskType} from '@/store/tasks.store.ts';

type ArgsType = {
    taskData: TaskType | null;
};

export default {
    title: 'Components/AddEditTask',
    component: AddEditTask,
};

const Template = (args: ArgsType) => ({
    components: {AddEditTask},
    setup() {
        return {args};
    },
    template: '<div id="modals" class="relative z-20"></div><add-edit-task v-bind="args" />',
});

export const Default: any = Template.bind({});
Default.args = {
    taskData: null,
};

export const Pending: any = Template.bind({});
Pending.args = {
    taskData: {
        title: 'Test Task',
        description: 'This is a test task',
        dueDate: '2023-12-31',
        status: 'pending',
        id: '2',
    },
};

export const InProgress: any = Template.bind({});
InProgress.args = {
    taskData: {
        title: 'Test Task',
        description: 'This is a test task',
        dueDate: '2023-12-31',
        status: 'inProgress',
        id: '2',
    },
};

export const Completed: any = Template.bind({});
Completed.args = {
    taskData: {
        title: 'Test Task',
        description: 'This is a test task',
        dueDate: '2023-12-31',
        status: 'completed',
        id: '2',
    },
};