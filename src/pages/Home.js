import React, { useState } from 'react';
import { Layout, Row, Col, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CommandCard from '../components/common/CommandCard';
import { commands } from '../data/commands';

const { Content } = Layout;
const { Title } = Typography;

function Home() {
  const [searchText, setSearchText] = useState('');

  const getFilteredCommands = () => {
    if (!searchText) {
      return commands;
    }

    const filtered = {};
    Object.entries(commands).forEach(([key, category]) => {
      const filteredCmds = category.commands.filter(cmd =>
        cmd.name.toLowerCase().includes(searchText.toLowerCase()) ||
        cmd.command.toLowerCase().includes(searchText.toLowerCase())
      );
      if (filteredCmds.length > 0) {
        filtered[key] = {
          ...category,
          commands: filteredCmds
        };
      }
    });
    return filtered;
  };

  const filteredCommands = getFilteredCommands();

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', padding: '0 24px', overflow: 'hidden' }}>
      <div style={{ 
        width: '100%',
        maxWidth: 1400, 
        margin: '68px auto',
      }}>
        <Layout style={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <Content style={{ padding: '24px 32px' }}>
            <Row justify="end" style={{ marginBottom: 24 }}>
              <Col>
                <Input
                  placeholder="搜索命令..."
                  prefix={<SearchOutlined />}
                  onChange={e => setSearchText(e.target.value)}
                  style={{ width: 300 }}
                  allowClear
                />
              </Col>
            </Row>
            {Object.entries(filteredCommands).map(([key, category]) => (
              <div key={key} style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <Title level={5} style={{ 
                  margin: 0,
                  minWidth: '120px',
                  paddingTop: '8px'
                }}>
                  {category.title}
                </Title>
                <div style={{ flex: 1 }}>
                  <Row gutter={[16, 16]}>
                    {category.commands.map((cmd, cmdIndex) => (
                      <Col span={24} key={cmdIndex} style={{ marginBottom: 8 }}>
                        <CommandCard {...cmd} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            ))}
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default Home; 