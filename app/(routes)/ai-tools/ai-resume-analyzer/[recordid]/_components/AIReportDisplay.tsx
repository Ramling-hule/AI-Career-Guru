import { Card } from '../../../../../../components/ui/card';
import { Progress } from '../../../../../../components/ui/progress';
import { Badge } from '../../../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../components/ui/tabs';
import { Alert, AlertDescription } from '../../../../../../components/ui/alert';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb,
  Target,
  Award,
  User,
  Briefcase,
  GraduationCap,
  Code,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from 'recharts';


// interface AIReportDisplayProps {
//   aiReport: AIReport;
// }

export function AIReportDisplay({ aiReport }: any) {

  console.log("Inside" + aiReport);

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#16a34a'; // green
    if (score >= 60) return '#ca8a04'; // yellow
    return '#dc2626'; // red
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  const chartData = [
    {
      name: 'Score',
      value: aiReport?.overall_score,
      fill: getScoreColor(aiReport.overall_score),
    },
  ];

  const sectionsData = [
    { name: 'Contact Info', score: aiReport.sections.contact_info.score, icon: User },
    { name: 'Experience', score: aiReport.sections.experience.score, icon: Briefcase },
    { name: 'Education', score: aiReport.sections.education.score, icon: GraduationCap },
    { name: 'Skills', score: aiReport.sections.skills.score, icon: Code },
  ];

  const barChartData = sectionsData.map(section => ({
    name: section.name,
    score: section.score,
  }));

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="p-8 border-2">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-gray-900">Overall Score</h2>
            </div>
            
            <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-xl border-2 ${getScoreBgColor(aiReport.overall_score)}`}>
              <div className={`text-5xl ${getScoreTextColor(aiReport.overall_score)}`}>
                {aiReport.overall_score}
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-600">out of 100</div>
                <div className={`${getScoreTextColor(aiReport.overall_score)}`}>
                  {getScoreLabel(aiReport.overall_score)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{aiReport.overall_feedback}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={24}
                data={chartData}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-700 text-4xl"
                >
                  {aiReport.overall_score}%
                </text>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-500 text-sm"
                >
                  {getScoreLabel(aiReport.overall_score)}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-gray-700">
              {aiReport.summary_comment}
            </AlertDescription>
          </Alert>
        </div>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">
            <Target className="w-4 h-4 mr-2" />
            Sections
          </TabsTrigger>
          <TabsTrigger value="strengths">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Strengths
          </TabsTrigger>
          <TabsTrigger value="improvements">
            <ThumbsDown className="w-4 h-4 mr-2" />
            To Improve
          </TabsTrigger>
          <TabsTrigger value="tips">
            <Lightbulb className="w-4 h-4 mr-2" />
            Tips
          </TabsTrigger>
        </TabsList>

        {/* Sections Tab */}
        <TabsContent value="sections" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-6">Section Scores Overview</h3>
            <div className="mb-8">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6">
              {sectionsData.map((section, idx) => {
                const sectionKey = section.name.toLowerCase().replace(' ', '_') as keyof typeof aiReport.sections;
                const sectionData = aiReport.sections[sectionKey];
                const Icon = section.icon;

                return (
                  <Card key={idx} className="p-5 bg-gray-50 border">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-lg ${getScoreBgColor(sectionData.score)}`}>
                        <Icon className={`w-5 h-5 ${getScoreTextColor(sectionData.score)}`} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-gray-900">{section.name}</h4>
                          <Badge variant="outline" className={getScoreTextColor(sectionData.score)}>
                            {sectionData.score}/100
                          </Badge>
                        </div>
                        <Progress value={sectionData.score} className="h-2" />
                        <p className="text-sm text-gray-700">{sectionData.comment}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Strengths Tab */}
        <TabsContent value="strengths" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-900">What's Good</h3>
            </div>
            
            <div className="space-y-3">
              {aiReport.whats_good.map((item:any, idx:any) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Improvements Tab */}
        <TabsContent value="improvements" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ThumbsDown className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-gray-900">Needs Improvement</h3>
            </div>
            
            <div className="space-y-3">
              {aiReport.needs_improvement.map((item:any, idx:any) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Lightbulb className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-gray-900">Tips for Improvement</h3>
            </div>
            
            <div className="space-y-3">
              {aiReport.tips_for_improvement.map((tip:any, idx:any) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 pt-0.5">{tip}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="text-gray-900">Quick Wins</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600 flex-shrink-0" />
                <span>Complete all professional profile links (LinkedIn, GitHub, Portfolio)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600 flex-shrink-0" />
                <span>Add a 2-3 sentence professional summary at the top</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600 flex-shrink-0" />
                <span>Quantify at least one achievement per project with numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-600 flex-shrink-0" />
                <span>Organize skills into categories (Languages, Frameworks, Tools)</span>
              </li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
