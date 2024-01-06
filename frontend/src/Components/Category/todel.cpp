class Solution {
public:
    int maximizeSquareArea(int m, int n, vector<int>& hFences, vector<int>& vFences) {
        hFences.push_back(1);
        hFences.push_back(m);
        vFences.push_back(1);
        vFences.push_back(n);
        sort(hFences.begin(), hFences.end());
        sort(vFences.begin(), vFences.end());
        set<int>diff;
        for(int i = static_cast<int>(hFences.size()-1); i>=0; i--){
            for(int j=0; j<i; j++){
                int d = hFences[i] - hFences[j];
                diff.insert(d);
            }
        }
        vector<int>vD;
        for(int i = static_cast<int>(vFences.size()-1); i>=0; i--){
            for(int j=0; j<i; j++){
                int d = vFences[i] - vFences[j];
                vD.push_back(d);
            }
        }
        sort(vD.begin(), vD.end());
        int res = -1;
        for(int i=static_cast<int>(vD.size()-1); i>=0; i--){
            if(diff.find(vD[i]) != diff.end()){
                res = vD[i];
                break;
            }
        }
        int M = 1e9 + 7;
        if(res != -1){
            res = static_cast<int>((1ll*res*res) % M);
        }
        return res;
    }
};