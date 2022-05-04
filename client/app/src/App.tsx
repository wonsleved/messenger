import React, {FC, memo, ReactElement, useEffect, useState} from 'react';
import AppRoutes from "./routes/AppRouter";
import ErrorsList from "./components/Error/ErrorsList";
import {UserService} from "./services/user.service";
import {userLoaded} from "./store/reducers/auth.slice";
import {clearErrors} from "./store/reducers/error.slice";
import {useAppDispatch} from "./hooks/store.hook";


const App: FC = (): ReactElement => {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        UserService.getMyInfo()
            .then(user => {
                dispatch(userLoaded(user));
                dispatch(clearErrors());
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="page">
            {loading ?
                <div style={{height: '100%', width: '100%', display: 'grid', placeItems: 'center'}}>
                    Loading...
                </div>
                :
                <>
                    <ErrorsList/>
                    <AppRoutes/>
                </>
            }
        </div>
    );

};


export default memo<FC>(App);
