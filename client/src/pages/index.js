import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import Register from '../components/auth/Register';
import Leads from '../components/leads/Leads';
import Lead from '../components/leads/Lead';
import LeadEdit from '../components/leads/LeadEdit';
import Deals from '../components/deals/Deals';
import Deal from '../components/deals/Deal';
import DealEdit from '../components/deals/DealEdit';
import Home from './Home';
import Index from '../components/history';

const Pages = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Switch>

            <Route path='/leads/:id/edit' exact>
                <LeadEdit />
            </Route>

            <Route path='/leads/:id' exact>
                <Lead />
            </Route>

            <Route path='/leads' exact>
                <Leads />
            </Route>

            <Route path='/deals/:id/edit' exact>
                <DealEdit />
            </Route>

            <Route path='/deals/:id' exact>
                <Deal />
            </Route>

            <Route path='/deals' exact>
                <Deals />
            </Route>

            <Route path='/history' exact>
                <Index />
            </Route>

            <Route path='/' exact>
                <Home />
            </Route>

            <Redirect to='/' />
        </Switch>
    }

    return <Switch>
        <Route path='/auth' exact>
            <Auth />
        </Route>

        <Route path='/register' exact>
            <Register />
        </Route>

        <Redirect to='/auth' />
    </Switch>
}

export default Pages;
