import React, { useState } from 'react';
import { Card, Button, message, Typography, Select } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { appConfigs, logTypes } from '../../data/commands';

const { Text } = Typography;
const { Option } = Select;

const getPackageLastPart = (pkg) => pkg.split('.').pop();

const CommandCard = ({ name, command, hasPackageSelect, hasLogTypeSelect, transformPackage }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(Object.values(appConfigs)[0].applicationID);
  const [selectedLogType, setSelectedLogType] = useState(logTypes[0]);

  const getActualCommand = () => {
    let finalCommand = command;
    if (hasPackageSelect) {
      const packageValue = transformPackage ? 
        transformPackage(selectedPackage) : 
        selectedPackage;
      finalCommand = finalCommand.replace('{package}', packageValue);
    }
    if (hasLogTypeSelect) {
      finalCommand = finalCommand.replace('{logType}', selectedLogType);
    }
    return finalCommand;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getActualCommand()).then(() => {
      message.success('命令已复制');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <Card
      size="small"
      bodyStyle={{
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '12px',
        flex: 1
      }}>
        <Text strong style={{ fontSize: 14, minWidth: '160px' }}>{name}</Text>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: 1
        }}>
          <Text style={{
            fontFamily: 'monospace',
            fontSize: 13,
            background: '#f5f5f5',
            padding: '4px 8px',
            borderRadius: '4px',
            flex: 1
          }}>
            {getActualCommand()}
          </Text>
          {hasLogTypeSelect && (
            <Select
              value={selectedLogType}
              onChange={setSelectedLogType}
              style={{ width: 150 }}
              size="small"
            >
              {logTypes.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          )}
          {hasPackageSelect && (
            <Select
              value={selectedPackage}
              onChange={setSelectedPackage}
              style={{ width: 150 }}
              size="small"
            >
              {Object.values(appConfigs).map(config => (
                <Option key={config.applicationID} value={config.applicationID}>
                  {getPackageLastPart(config.applicationID)}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </div>
      <Button
        size="small"
        type="primary"
        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
        onClick={copyToClipboard}
        style={{ marginLeft: 12 }}
      >
        {copied ? '已复制' : '复制'}
      </Button>
    </Card>
  );
};

export default CommandCard; 