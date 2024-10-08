import React, { useEffect, useState } from 'react'
import {
    Spin,
    Cascader,
    Switch,
    Select,
} from 'antd'
import apis from '~/utils/CallApi'
import styles from '~/styles/index.module.css'
import constants from '~/utils/Constants'
import urls from '~/utils/Urls'
export default function Settings(props) {
    const setPermission = props.setPermisiion_
    const [selectLimitKey, setSelectLimitKey] = useState(undefined)
    const [config, setConfig] = useState([])
    const [checkedMaintenance, setCheckedMaintenance] = useState(false)
    const [loadingMaintenance, setLoadingMaintenance] = useState(false)
    const [loadingLimitKey, setLoadingLimitKey] = useState(false)
    const [optionChooseGame, setOptionChooseGame] = useState([])
    const [selectChooseGame, setSelectChooseGame] = useState([])
    const columnsLimitKey = [
        {
            label: '1 key/ ngày',
            value: 'ONE_KEY_DAY',
        },
        {
            label: '2 key/ ngày',
            value: 'TWO_KEY_DAY',
        },
        {
            label: '1 key/ giờ',
            value: 'ONE_KEY_HOUR',
        },
        {
            label: '1 key/ 2 giờ',
            value: 'TWO_KEY_HOUR',
        },
        {
            label: '5 key/ 1 giờ',
            value: 'FIVE_KEY_HOUR',
        },
        {
            label: '5 key/ 1 ngày',
            value: 'FIVE_KEY_DAY',
        },
    ]
    useEffect(() => {
        apis().get(urls().URL_GET_CONFIG).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    setConfig(response.body)
                } else {
                    setPermission(false)
                }
            } else {
                setPermission(false)
            }
        })

        apis().get(urls().URL_CATEGORY).then(response => {
            if (response) {
                if (response.status === constants().SUCCESS) {
                    let arr = []
                    response.body.map(item => {
                        arr = [...arr, {
                            label: item.name,
                            value: item.code,
                        }]
                    })
                    setOptionChooseGame(arr)
                    apis().get(urls().URL_GET_CONFIG_VISIT).then(response => {
                        if (response) {
                            if (response.status === constants().SUCCESS) {
                                let arr = []
                                response.body.map(item => {
                                    arr = [...arr, item.code]
                                })
                                setSelectChooseGame(arr)
                            } else {
                                setPermission(false)
                            }
                        } else {
                            setPermission(false)
                        }
                    })
                } else {
                    setPermission(false)
                }
            } else {
                setPermission(false)
            }
        })
    }, [])

    useEffect(() => {
        const filterLimitKey = config.filter(item => item.code === 'visits')[0]
        const filterMaintenance = config.filter(item => item.code === 'maintenance')[0]
        if (filterLimitKey) {
            setSelectLimitKey([filterLimitKey.value])
        }
        if (filterMaintenance) {
            setCheckedMaintenance(filterMaintenance.value.toLowerCase() === 'true')
        }
    }, [config])

    function handleSwitchMaintenance(checked) {
        setCheckedMaintenance(checked)
    }

    function handleUpdate() {
        setLoadingMaintenance(true)
        apis().post(urls().URL_UPDATE_CONFIG, {
            value: checkedMaintenance.toString(),
            code: 'maintenance',
        }).then(response => {
            if (response) {
                setLoadingMaintenance(false)
            } else {
                setPermission(false)
            }
        })
        setLoadingLimitKey(true)
        apis().post(urls().URL_UPDATE_CONFIG, {
            value: selectLimitKey[0],
            code: 'visits',
            category: selectChooseGame,
        }).then(response => {
            if (response) {
                setLoadingLimitKey(false)
            } else {
                setPermission(false)
            }
        })
    }
    function handleChooseGame(value) {
        setSelectChooseGame(value)
    }

    return <>
        <div className={styles.borderSetting}>
            <div>
                <p>Cấu hình truy cập</p>
                <hr style={{ marginTop: '10px' }}/>
                <div className={styles.itemSetting}>
                    <div>
                        <span>Giới hạn lượt nhận key</span>
                    </div>
                    <div>

                        <div>
                            <Spin style={{ marginRight: '5px' }} spinning={loadingLimitKey} size={'small'}/>
                            <Cascader
                                allowClear={false}
                                onChange={(value) => setSelectLimitKey(value)}
                                value={selectLimitKey}
                                placeholder={'Chọn phương thức giới hạn'}
                                options={columnsLimitKey}
                            />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <span>Chọn game</span>
                            <Select
                                style={{ marginTop: '5px', width: '100%' }}
                                mode="multiple"
                                allowClear
                                placeholder="Chọn game"
                                onChange={handleChooseGame}
                                options={optionChooseGame}
                                value={selectChooseGame}
                            />
                        </div>
                    </div>
                </div>
                <hr style={{ marginTop: '10px' }}/>
                <div className={styles.itemSetting}>
                    <div>
                        <span>Bảo trì máy chủ</span>
                    </div>
                    <div>
                        <Spin style={{ marginRight: '5px' }} spinning={loadingMaintenance} size={'small'}/>
                        <Switch
                            checked={checkedMaintenance}
                            onChange={handleSwitchMaintenance}
                        />
                    </div>
                </div>
                <div className={styles.itemSettingv2}>
                    <div>
                        <button
                            onClick={handleUpdate}
                            className={styles.buttonUpdateSetting}>Cập nhật</button>
                    </div>
                </div>

            </div>
        </div>
    </>
}
