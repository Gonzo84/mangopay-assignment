// .storybook/SignIn.stories.ts
import SignIn from '@/views/auth/SignIn.vue';
import {expect, within, userEvent} from "@storybook/test";

type ArgsType = {};
export default {
    title: 'Views/SignIn',
    component: SignIn,
};
const Template = (args: ArgsType) => ({
    components: {SignIn},
    setup() {
        return {args};
    },
    template: '<sign-in />',
});
export const Default: any = Template.bind({});
export const WithError: any = Template.bind({});
WithError.play = async ({canvasElement}: any) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'test@test.com', {
        delay: 100,
    });

    const passwordInput = canvas.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'wrongPassword', {
        delay: 100,
    });
    const submitButton = canvas.getByRole('button');

    await userEvent.click(submitButton, {
        delay: 100,
    });
    await new Promise((r) => setTimeout(r, 1000));
    const errorElement = canvas.getByRole('alert');
    await expect(errorElement).toBeInTheDocument();
};