import {CoinCard} from './CoinCard';

import type {ComponentMeta, ComponentStory} from "@storybook/react";
import {DefaultLayout} from "../../layouts";

export default {
    title: 'Components/CoinCard',
    component: CoinCard,
} as ComponentMeta<typeof CoinCard>;

const Template: ComponentStory<typeof CoinCard> = (args) => {
    return (
        <DefaultLayout>
            <CoinCard {...args} />
        </DefaultLayout>
    );
}

export const CoinCardStory = Template.bind({});
CoinCardStory.args = {
    name: 'palm',
    ticker: 'PALM',
    balance: '0.05000',
    onClick: () => {
        console.log('click');
    }
}
